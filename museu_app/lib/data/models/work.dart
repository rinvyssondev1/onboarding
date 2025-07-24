// ignore_for_file: public_member_api_docs, sort_constructors_first
class Work {
  final int id;
  final int attractionId;
  final String title;
  final String author;
  final String description;

  Work({
    required this.id,
    required this.attractionId,
    required this.title,
    required this.author,
    required this.description,
  });

  factory Work.fromJson(Map<String, dynamic> json) {
    return Work(
      id: json['id'] as int,
      attractionId: json['attraction_id'] as int,
      title: json['title'] as String,
      author: json['author'] as String,
      description: json['description'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return <String, dynamic>{
      'id': id,
      'attractionId': attractionId,
      'title': title,
      'author': author,
      'description': description,
    };
  }

  
}
