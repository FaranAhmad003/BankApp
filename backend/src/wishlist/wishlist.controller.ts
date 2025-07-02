import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('toggle/:bookId')
  toggleWishlist(@Param('bookId') bookId: string, @Body('userId') userId: number) {
    if (!userId) {
      return { message: 'Unauthorized access' };
    }
    return this.wishlistService.toggle(userId, parseInt(bookId));
  }

  @Get()
  getWishlist(@Body('userId') userId: number) {
    if (!userId) {
      return { message: 'Unauthorized access' };
    }
    return this.wishlistService.getUserWishlist(userId);
  }
}
