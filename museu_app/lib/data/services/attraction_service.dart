import 'package:museu_app/data/models/Attraction.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AttractionService {
  final String baseUrl = 'http://192.168.0.7:3000/api';

  Future<List<Attraction>> fetchAttraction() async {
    final response = await http.get(Uri.parse('$baseUrl/attraction'));
    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      return jsonResponse.map<Attraction>((data) => Attraction.fromJson(data)).toList();
    } else {
      throw Exception('Failed to load attraction');
    }
  }
}