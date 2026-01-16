import { Controller, Get, Param, NotFoundException, Logger } from '@nestjs/common';
import { UserService } from '../services/user.service';

/**
 * UserController
 * 
 * Handles user-related endpoints for retrieving user information.
 */
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  /**
   * Validate if a user exists by ID
   * 
   * GET /users/:userId/validate
   * 
   * @param userId - User's unique identifier
   * @returns User validation response
   */
  @Get(':userId/validate')
  async validateUser(@Param('userId') userId: string): Promise<{ exists: boolean; userId: string }> {
    this.logger.log(`GET /users/${userId}/validate`);
    const exists = await this.userService.userExists(userId);
    
    return {
      exists,
      userId,
    };
  }

  /**
   * Get user by ID
   * 
   * GET /users/:userId
   * 
   * @param userId - User's unique identifier
   * @returns User information (without sensitive data)
   */
  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<{ id: string; email: string; roles: string[] }> {
    this.logger.log(`GET /users/${userId}`);
    const user = await this.userService.getUserById(userId);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    
    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }
}
