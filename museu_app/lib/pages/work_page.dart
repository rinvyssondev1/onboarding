import 'package:flutter/material.dart';
import 'package:museu_app/data/models/Attraction.dart';
import 'package:museu_app/data/models/work.dart';
import 'package:museu_app/data/services/work_service.dart';
import 'package:museu_app/widgets/loading_widget.dart';

class WorkPage extends StatefulWidget{
  final Attraction attraction;

  const WorkPage({super.key, required this.attraction});

  @override
  State<WorkPage> createState() => _WorkPageState();
}

class _WorkPageState extends State<WorkPage> {
  
  final WorkService _workService = WorkService();
  List<Work> works = [];
  bool isLoading = true;
  late final int attractionId = widget.attraction.id;

  @override
  void initState() {
    super.initState();
    loadWorks();
  }

  Future<void> loadWorks() async {
    try {
      final data = await _workService.fetchWorks(attractionId);
      setState(() {
        works = data;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load attractions: $e')),
      );
    }
  }

  @override
Widget build(BuildContext context) {
  return Scaffold(
    backgroundColor: Colors.lightBlue[50],
    // ...existing code...
body: isLoading
    ? const LoadingWidget()
    : Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(8, 48, 8, 0),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back, color: Color.fromARGB(255, 61, 2, 199)),
                  onPressed: () => Navigator.of(context).pop(),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Obras ${widget.attraction.name}',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Color.fromARGB(255, 61, 2, 199),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: works.isEmpty
                ? const Center(child: Text('Não existe obras cadastradas.'))
                : ListView.builder(
                    itemCount: works.length,
                    itemBuilder: (context, index) {
                      final work = works[index];
                      return Card(
                        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        child: ListTile(
                          title: Text(
                            work.title,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                              color: Color.fromARGB(255, 13, 10, 206),
                            ),
                          ),
                          subtitle: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Autor: ${work.author}',
                                style: const TextStyle(
                                  fontWeight: FontWeight.w500,
                                  color: Colors.black87,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(work.description),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
          ),
        ]
      ),
  );
}
}