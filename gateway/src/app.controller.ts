import { Body, Controller, Headers, Delete, Get, ParseIntPipe, Param, Patch, Post, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { LoginUserDto, RegisterUserDto } from './gateway/auth.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUsersDto } from './gateway/update-users.dto';
import { UpdateManyMaterialsDto, UpdateMaterialDto, UpdateOneMaterialDto } from './gateway/update-material.dto';
import { CreateMaterialDto } from './gateway/create-material.dto';
import { DeleteManyMaterialsDto } from './gateway/delete-material.dto';
import { UpdateManyPartInformationDto, UpdateOnePartInformationDto } from './gateway/update-part-information.dto';
import { DeletePartInformationDto } from './gateway/delete-part-information.dto';
import { CreateManyPartInformationDto, CreatePartInformationDto } from './gateway/create-part-information.dto';
import { UpdateManySupplyChainDto, UpdateOneSupplyChainDto } from './gateway/update-supply-chain.dto';
import { CreateManySupplyChainDto, CreateSupplyChainDto } from './gateway/create-supply-chain.dto';
import { CreateContractInput } from './gateway/create-contract.input';
import { UpdateContractsInput } from './gateway/update-contract.input';
import { PublishDto } from './gateway/publish-topic.dto';
import { SubscribeDto } from './gateway/subscribe-topic.dto';


@Controller()
export class AppController {
  constructor(private httpService: HttpService) { }

  // Users service
  @ApiTags('USER SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/users')
  @ApiOperation({ summary: 'Find all user' })
  @ApiResponse({ status: 401, description: 'Token is expired or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 500, description: 'Error finding users' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllUsers(@Headers('authorization') authHeader: any) {
    return this.httpService.get('http://users-services-backend:3001/api/v1/users', {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        if (err.response) {
          throw new HttpException(err.response.data, err.response.status);
        } else {
          throw new HttpException('Erreur de connexion au service', HttpStatus.SERVICE_UNAVAILABLE);
        }
      })
    );
  }

  @ApiTags('USER SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/users/:id')
  @ApiOperation({ summary: 'Find one user' })
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getUserById(@Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.get(`http://users-services-backend:3001/api/v1/users/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('USER SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/users/:id')
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({ status: 200, description: 'password updated', })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUserById(@Body() userData: UpdateUsersDto, @Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.patch(`http://users-services-backend:3001/api/v1/users/${id}`, userData, {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('USER SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/users/:id')
  @ApiOperation({ summary: 'delete one user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteUserById(@Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.delete(`http://users-services-backend:3001/api/v1/users/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('USER SERVICE')
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 401, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Error during token generation' })
  @ApiResponse({ status: 401, description: 'Wrong password' })
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() loginData: LoginUserDto) {
    return this.httpService.post('http://users-services-backend:3001/api/v1/login', loginData)
      .pipe(map(response => response.data),
        catchError(err => {
          throw new HttpException(err.response.data, err.response.status);
        })
      );
  }

  @ApiTags('USER SERVICE')
  @Post('register')
  @ApiResponse({ status: 400, description: 'User may already exist' })
  @ApiResponse({ status: 500, description: 'Error creating user' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() userData: RegisterUserDto) {
    return this.httpService.post('http://users-services-backend:3001/api/v1/register', userData)
      .pipe(map(response => response.data),
        catchError(err => {
          throw new HttpException(err.response.data, err.response.status);
        })
      );
  }

  //----------------------------------------------
  // production service
  // Material

  @ApiTags('MATERIALS SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/materials/:id')
  @ApiOperation({ summary: 'Find one material' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getMaterialById(@Headers('authorization') authHeader: any, @Param('id') id: number) {
    return this.httpService.get(`http://production-service-backend:3002/api/v1/materials/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MATERIALS SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/materials')
  @ApiOperation({ summary: 'Find all materials' })
  @ApiResponse({ status: 500, description: 'Error finding materials' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllMaterials(@Headers('authorization') authHeader: any) {
    return this.httpService.get('http://production-service-backend:3002/api/v1/materials', {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MATERIALS SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/materials')
  @ApiOperation({ summary: 'Create material' })
  @ApiResponse({ status: 400, description: 'Material already exists' })
  @ApiResponse({ status: 500, description: 'Error creating material' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createMaterial(@Body() materialData: CreateMaterialDto, @Headers('authorization') authHeader: any) {
    return this.httpService.post('http://production-service-backend:3002/api/v1/materials', materialData, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MATERIALS SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/materials/:id')
  @ApiOperation({ summary: 'Update material' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  @ApiResponse({ status: 409, description: 'Conflict with existing material' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateMaterialById(@Param('id') id: number, @Body() updateMaterialDto: UpdateOneMaterialDto, @Headers('authorization') authHeader: any) {
    return this.httpService.patch(`http://production-service-backend:3002/api/v1/materials/${id}`, updateMaterialDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MATERIALS SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/materials/:id')
  @ApiOperation({ summary: 'Delete material' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteMaterialById(@Param('id') id: number, @Headers('authorization') authHeader: any) {
    return this.httpService.delete(`http://production-service-backend:3002/api/v1/materials/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MATERIALS SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/materials/many-materials')
  @ApiOperation({ summary: 'Create many materials' })
  @ApiResponse({ status: 400, description: 'Some materials already exist' })
  @ApiResponse({ status: 500, description: 'Error creating materials' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createManyMaterials(@Body() createMaterialDtos: CreateMaterialDto[], @Headers('authorization') authHeader: any) {
    return this.httpService.post('http://production-service-backend:3002/api/v1/materials/many-materials', createMaterialDtos, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MATERIALS SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/materials/many-materials')
  @ApiOperation({ summary: 'Update many materials' })
  @ApiResponse({ status: 404, description: 'One or more materials not found' })
  @ApiResponse({ status: 409, description: 'Conflict with existing materials' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateManyMaterials(@Body() updateManyMaterialsDto: UpdateManyMaterialsDto, @Headers('authorization') authHeader: any) {
    return this.httpService.patch('http://production-service-backend:3002/api/v1/materialss/many-materials', updateManyMaterialsDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MATERIALS SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/materials/many-materials')
  @ApiOperation({ summary: 'Delete many materials' })
  @ApiResponse({ status: 404, description: 'One or more materials not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteManyMaterials(@Body() deleteManyMaterialsDto: DeleteManyMaterialsDto, @Headers('authorization') authHeader: any) {
    return this.httpService.delete('http://production-service-backend:3002/api/v1/materials/many-materials', {
      headers: { 'Authorization': authHeader },
      data: deleteManyMaterialsDto
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  // part-information-service
  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/part-informations/:id')
  @ApiOperation({ summary: 'Find one part information' })
  @ApiResponse({ status: 404, description: 'Part information not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getPartInformationById(@Headers('authorization') authHeader: any, @Param('id') id: number) {
    return this.httpService.get(`http://production-service-backend:3002/api/v1/part-informations/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/part-informations')
  @ApiOperation({ summary: 'Find all part informations' })
  @ApiResponse({ status: 500, description: 'Error finding part informations' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllPartInformations(@Headers('authorization') authHeader: any) {
    return this.httpService.get('http://production-service-backend:3002/api/v1/part-information', {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/part-informations')
  @ApiOperation({ summary: 'Create part information' })
  @ApiResponse({ status: 500, description: 'Error creating part information' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createPartInformation(@Body() createPartInformationDto: CreatePartInformationDto, @Headers('authorization') authHeader: any) {
    return this.httpService.post('http://production-service-backend:3002/api/v1/part-information', createPartInformationDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/part-informations/many-part-informations')
  @ApiOperation({ summary: 'Create many part informations' })
  @ApiResponse({ status: 500, description: 'Error creating part informations' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createManyPartInformations(@Body() createManyPartInformationsDto: CreateManyPartInformationDto, @Headers('authorization') authHeader: any) {
    return this.httpService.post('http://production-service-backend:3002/api/v1/part-information/many-part-informations', createManyPartInformationsDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/part-informations/:id')
  @ApiOperation({ summary: 'Update part information' })
  @ApiResponse({ status: 404, description: 'Part information not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateOnePartInformation(@Param('id') id: number, @Body() updatePartInformationDto: UpdateOnePartInformationDto, @Headers('authorization') authHeader: any) {
    return this.httpService.patch(`http://production-service-backend:3002/api/v1/part-information/${id}`, updatePartInformationDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/part-informations/many-part-informations')
  @ApiOperation({ summary: 'Update many part informations' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'One or more part informations not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateManyPartInformations(@Body() updateManyPartInformationDto: UpdateManyPartInformationDto, @Headers('authorization') authHeader: any) {
    return this.httpService.patch('http://production-service-backend:3002/api/v1/part-information/many-part-informations', updateManyPartInformationDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/part-informations/:id')
  @ApiOperation({ summary: 'Delete part information' })
  @ApiResponse({ status: 404, description: 'Part information not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  deletePartInformation(@Param('id') id: number, @Headers('authorization') authHeader: any) {
    return this.httpService.delete(`http://production-service-backend:3002/api/v1/part-information/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/part-informations/many-part-informations')
  @ApiOperation({ summary: 'Delete many part informations' })
  @ApiResponse({ status: 404, description: 'One or more part informations not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteManyPartInformation(@Body() deleteManyPartInformationDto: DeletePartInformationDto, @Headers('authorization') authHeader: any) {
    return this.httpService.delete('http://production-service-backend:3002/api/v1/part-information/many-part-informations', {
      headers: { 'Authorization': authHeader },
      data: deleteManyPartInformationDto
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/part-informations/:partInformationId/add-materials')
  @ApiOperation({ summary: 'Add materials to part information' })
  @ApiResponse({ status: 404, description: 'Part information or one or more materials not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  addMaterialToPartInformation(@Param('partInformationId') partInformationId: number, @Body() createPartInformationMaterialsDto: CreatePartInformationDto, @Headers('authorization') authHeader: any) {
    return this.httpService.post(`http://production-service-backend:3002/api/v1/part-information/${partInformationId}/add-materials`, createPartInformationMaterialsDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('PART INFORMATION SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/part-informations/:partInformationId/delete-materials')
  @ApiOperation({ summary: 'Delete materials from part information' })
  @ApiResponse({ status: 404, description: 'Part information not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteMaterialFromPartInformation(@Param('partInformationId') partInformationId: number, @Body() deletePartInformationMaterialsDto: DeletePartInformationDto, @Headers('authorization') authHeader: any) {
    return this.httpService.delete(`http://production-service-backend:3002/api/v1/part-information/${partInformationId}/delete-materials`, {
      headers: { 'Authorization': authHeader },
      data: deletePartInformationMaterialsDto
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  // Machine service
  @ApiTags('MACHINE SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/machines/:id')
  @ApiOperation({ summary: 'Find one machine' })
  @ApiResponse({ status: 404, description: 'Machine not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getMachineById(@Headers('authorization') authHeader: any, @Param('id') id: number) {
    return this.httpService.get(`http://machine-services-backend/api/v1/machine/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MACHINE SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/machines')
  @ApiOperation({ summary: 'Find all machines' })
  @ApiResponse({ status: 500, description: 'Error finding machines' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllMachines(@Headers('authorization') authHeader: any) {
    return this.httpService.get('http://machine-services-backend/api/v1/machine', {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MACHINE SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/machines')
  @ApiOperation({ summary: 'Create one machine' })
  @ApiResponse({ status: 500, description: 'Error in creating a machine' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createOneMachine(@Headers('authorization') authHeader: any) {
    return this.httpService.post('http://machine-services-backend/api/v1/machine', {}, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MACHINE SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/machines/many-machines')
  @ApiOperation({ summary: 'Create many machines' })
  @ApiResponse({ status: 500, description: 'Error in creating machines' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createManyMachines(@Body('quantity') quantity: number, @Headers('authorization') authHeader: any) {
    return this.httpService.post('http://machine-services-backend/api/v1/machine/many-machines', { quantity }, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MACHINE SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/machines/:id')
  @ApiOperation({ summary: 'Delete one machine' })
  @ApiResponse({ status: 404, description: 'Machine not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteOneMachine(@Param('id') id: number, @Headers('authorization') authHeader: any) {
    return this.httpService.delete(`http://machine-services-backend/api/v1/machine/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('MACHINE SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/machines/many-machines')
  @ApiOperation({ summary: 'Delete many machines' })
  @ApiResponse({ status: 404, description: 'Some machines were not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteManyMachines(@Body('machineIds') machineIds: number[], @Headers('authorization') authHeader: any) {
    return this.httpService.delete('http://machine-services-backend/api/v1/machine/many-machines', {
      headers: { 'Authorization': authHeader },
      data: { machineIds }
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }


  // Supply-chain-service
  @ApiTags('SUPPLY CHAIN SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/supply-chains/:id')
  @ApiOperation({ summary: 'Find one supply chain' })
  @ApiResponse({ status: 404, description: 'SupplyChain not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getSupplyChainById(@Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.get(`http://production-service-backend:3002/api/v1/supply-chain/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('SUPPLY CHAIN SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/supply-chains')
  @ApiOperation({ summary: 'Find all supply chains' })
  @ApiResponse({ status: 500, description: 'Error finding supply chains' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllSupplyChains(@Headers('authorization') authHeader: any) {
    return this.httpService.get('http://production-service-backend:3002/api/v1/supply-chain', {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('SUPPLY CHAIN SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/supply-chains')
  @ApiOperation({ summary: 'Create supply chain' })
  @ApiResponse({ status: 404, description: 'Machine ID or PartInformation ID not found' })
  @ApiResponse({ status: 500, description: 'Error creating supply chain' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createSupplyChain(@Body() createSupplyChainDto: CreateSupplyChainDto, @Headers('authorization') authHeader: any) {
    return this.httpService.post('http://production-service-backend:3002/api/v1/supply-chain', createSupplyChainDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('SUPPLY CHAIN SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/supply-chains/many-supply-chain')
  @ApiOperation({ summary: 'Create many supply chains' })
  @ApiResponse({ status: 404, description: 'Machine ID or PartInformation ID not found for one or more items' })
  @ApiResponse({ status: 500, description: 'Error creating supply chains' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createManySupplyChains(@Body() createManySupplyChainDto: CreateManySupplyChainDto, @Headers('authorization') authHeader: any) {
    return this.httpService.post('http://production-service-backend:3002/api/v1/supply-chain/many-supply-chain', createManySupplyChainDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('SUPPLY CHAIN SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/supply-chains/:id')
  @ApiOperation({ summary: 'Update supply chain' })
  @ApiResponse({ status: 404, description: 'SupplyChain, Machine ID, or PartInformation ID not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateOneSupplyChain(@Param('id') id: string, @Body() updateSupplyChainDto: UpdateOneSupplyChainDto, @Headers('authorization') authHeader: any) {
    return this.httpService.patch(`http://production-service-backend:3002/api/v1/supply-chain/${id}`, updateSupplyChainDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('SUPPLY CHAIN SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/supply-chains/many-supply-chain')
  @ApiOperation({ summary: 'Update many supply chains' })
  @ApiResponse({ status: 404, description: 'SupplyChain, Machine ID, or PartInformation ID not found for one or more items' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateManySupplyChains(@Body() updateManySupplyChainDto: UpdateManySupplyChainDto, @Headers('authorization') authHeader: any) {
    return this.httpService.patch('http://production-service-backend:3002/api/v1/supply-chain/many-supply-chain', updateManySupplyChainDto, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  // MQTT Service
  @ApiTags('MQTT SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/mqtt/publish')
  @ApiOperation({ summary: 'Publish a message to a MQTT topic' })
  @ApiResponse({ status: 500, description: 'Error in publishing message' })
  @UsePipes(new ValidationPipe({ transform: true }))
  publishMessage(@Body() publishDto: PublishDto, @Headers('authorization') authHeader: any) {
    const { topic, message } = publishDto;
    // return this.mqttService.publishMessage(topic, message)
    //   .then(() => ({ status: 'Message published successfully' }))
    //   .catch(err => throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR));
  }

  @ApiTags('MQTT SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/mqtt/subscribe')
  @ApiOperation({ summary: 'Subscribe to a MQTT topic' })
  @ApiResponse({ status: 500, description: 'Error in subscribing to topic' })
  @UsePipes(new ValidationPipe({ transform: true }))
  subscribeToTopic(@Body() subscribeDto: SubscribeDto, @Headers('authorization') authHeader: any) {
    const { topic } = subscribeDto;
    // return this.mqttService.subscribeToTopic(topic, (receivedTopic, message) => {
    //   // Traiter le message reçu
    // })
    //   .then(() => ({ status: `Subscribed to topic ${topic}` }))
    //   .catch(err => throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR));
  }



  // contrat-service
  @ApiTags('CONTRAT SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Post('gateway/contracts')
  @ApiOperation({ summary: 'Create contract' })
  @ApiResponse({ status: 500, description: 'Error in creating contract' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createContract(@Body() createContractInput: CreateContractInput, @Headers('authorization') authHeader: any) {
    return this.httpService.post('http://contract-service-backend:4002/api/v1/contracts', createContractInput, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('CONTRAT SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/contracts')
  @ApiOperation({ summary: 'Find all contracts' })
  @ApiResponse({ status: 500, description: 'Error finding contracts' })
  @UsePipes(new ValidationPipe({ transform: true }))
  findAllContracts(@Headers('authorization') authHeader: any) {
    return this.httpService.get('http://contract-service-backend:4002/api/v1/contracts', {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }


  @ApiTags('CONTRAT SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/contracts/:contract_number')
  @ApiOperation({ summary: 'Find one contract by contract number' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  findOneContract(@Param('contract_number') contract_number: string, @Headers('authorization') authHeader: any) {
    return this.httpService.get(`http://contract-service-backend:4002/api/v1/contracts/${contract_number}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('CONTRAT SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/contracts/:contract_number')
  @ApiOperation({ summary: 'Update contract' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateContract(@Param('contract_number') contract_number: string, @Body() updateContractInput: UpdateContractsInput, @Headers('authorization') authHeader: any) {
    return this.httpService.patch(`http://contract-service-backend:4002/api/v1/contracts/${contract_number}`, updateContractInput, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiTags('CONTRAT SERVICE')
  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/contracts/:contract_number')
  @ApiOperation({ summary: 'Delete contract' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  removeContract(@Param('contract_number') contract_number: string, @Headers('authorization') authHeader: any) {
    return this.httpService.delete(`http://contract-service-backend:4002/api/v1/contracts/${contract_number}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }


}