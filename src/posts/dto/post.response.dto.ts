// Import the type representing a document of the Post entity
import { PostDocument } from '../entities/post.entity';

// Define the PostResponseDTO class representing the response structure for posts
export default class PostResponseDTO {
  // Constructor initializes properties based on provided arguments
  constructor(
    // ID of the post
    public id: string,
    // Title of the post
    public title: string,
    // Body/content of the post
    public body: string,
    // Date when the post was created
    public creationDate: string,
  ) {}

  // Static method to convert a PostDocument to a PostResponseDTO instance
  static from = ({
    // MongoDB ObjectId representing the post's ID
    _id,
    // Title of the post
    title,
    // Body/content of the post
    body,
    // Date when the post was created
    creationDate,
  }: PostDocument): PostResponseDTO =>
    new PostResponseDTO(
      // Convert MongoDB ObjectId to its hexadecimal representation
      _id.toHexString(),
      title,
      body,
      creationDate,
    );
}