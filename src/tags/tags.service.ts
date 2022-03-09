import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private TagsRepository: Repository<Tag>) {}

  create(name: string): Tag {
    return this.TagsRepository.create({ name: name });
  }

  save(tag: Tag): Promise<Tag> {
    return this.TagsRepository.save(tag);
  }

  findByName(name: string): Promise<Tag> {
    return this.TagsRepository.findOne({ name: name });
  }
}
