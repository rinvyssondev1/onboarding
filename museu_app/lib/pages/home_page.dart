import 'package:flutter/material.dart';
import 'package:museu_app/data/models/Attraction.dart';

import 'package:museu_app/data/services/attraction_service.dart';
import 'package:museu_app/pages/work_page.dart';
import 'package:museu_app/widgets/attraction_card.dart';
import 'package:museu_app/widgets/loading_widget.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final AttractionService _attractionService = AttractionService();
  List<Attraction> attractions = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    loadAttractions();
  }

  Future<void> loadAttractions() async {
    try {
      final data = await _attractionService.fetchAttraction();
      setState(() {
        attractions = data;
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
    body: isLoading
        ? LoadingWidget()
        : Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Padding(
                padding: EdgeInsets.fromLTRB(16, 60, 16, 8),
                child: Text(
                  'Museus',
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 61, 2, 199),
                  ),
                ),
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: attractions.length,
                  itemBuilder: (context, index) {
                    final museu = attractions[index];
                    return AttractionCard(
                      museu: museu,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => WorkPage(attraction: museu),
                          ),
                        );
                      },
                    );
                  },
                ),
              ),
            ],
          ),
  );
}
}