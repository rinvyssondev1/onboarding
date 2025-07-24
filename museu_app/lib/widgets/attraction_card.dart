import 'package:flutter/material.dart';
import 'package:museu_app/data/models/Attraction.dart';

class AttractionCard extends StatelessWidget {
  final Attraction museu;
  final VoidCallback onTap;

  const AttractionCard({
    super.key,
    required this.museu,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(8.0),
      child: InkWell(
        onTap: onTap,
        child: ListTile(
          title: Text(
            museu.name,
            style: const TextStyle(
              color: Color.fromARGB(255, 61, 2, 199),
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          subtitle: Text(museu.description),
        ),
      ),
    );
  }
}
