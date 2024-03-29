/*import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
*/
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PostDocument } from './entities/post.entity';
import PostResponseDTO from './dto/post.response.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @InjectModel('Post') private postModel: Model<PostDocument>,
  ) {}

  async AddNew(createPostDto: CreatePostDto): Promise<PostResponseDTO> {
    try {
      const { title, body } = createPostDto;
      const newPost = await this.postModel.create({
        title,
        body,
        // creationDate is a string representing the date
        creationDate: new Date().toISOString(),
      });
      return PostResponseDTO.from(newPost);
    } catch (error) {
      throw new HttpException(
        'Error while creating a post',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Array<PostResponseDTO>> {
    try {
      const posts = await this.postModel.find().sort('-creationDate').exec();
      return posts.map(PostResponseDTO.from);
    } catch (error) {
      throw new HttpException(
        'Error while fetching posts',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<PostResponseDTO> {
    const _id = new Types.ObjectId(id);
    const post = await this.postModel.findById(_id).exec();
    return PostResponseDTO.from(post);
  }

  async delete(id: string) {
    try {
      const _id = new Types.ObjectId(id);
      return await this.postModel.findByIdAndDelete(_id).exec();
    } catch (error) {
      throw new HttpException(
        'Error deleting the post',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
