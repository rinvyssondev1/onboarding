import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:museu_app/data/models/work.dart';

class WorkService {
  final String baseUrl = 'http://192.168.0.7:3000/api';

  Future<List<Work>> fetchWorks(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/attraction/$id/work'));
    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      return jsonResponse.map<Work>((data) => Work.fromJson(data)).toList();
    } else {
      throw Exception('Failed to load attraction');
    }
  }
}