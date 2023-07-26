import { IReviewRepository } from '../domain/reivew.repository';
import { PrismaService } from '../../database/infrastructure/prisma.service';
import { Injectable } from '@nestjs/common';
import { ReviewFindAllByProductIdOut } from '../domain/port/review.out';
import { Review as ReviewEntity } from '@prisma/client';

@Injectable()
export class ReviewPrismaRepository implements IReviewRepository {
  constructor(private prisma: PrismaService) {}
  async findAllByProductId(findAllByProductIdOut: ReviewFindAllByProductIdOut): Promise<ReviewEntity[]> {
    const { productId, lastReviewId, limit, sort, sortColumn } = findAllByProductIdOut;
    const sortQuery = {};
    sortQuery[sortColumn] = sort;
    const result = await this.prisma.review.findMany({
      where: {
        productId,
        deletedAt: null,
      },
      orderBy: [sortQuery],
      take: limit,
      skip: lastReviewId ? 1 : 0,
      ...(lastReviewId && { cursor: { id: lastReviewId } }),
    });
    return result;
  }
}
