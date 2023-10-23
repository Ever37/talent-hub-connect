/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CandidateColumns } from 'src/model/candidate-columns.type';
import { Candidate } from 'src/model/candidate.type';
import { CandidatesService } from './candidates.service';

@ApiTags('Candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @ApiOkResponse({ description: 'Array of reject reasons', type: [String] })
  @Get('reject-reasons')
  getAllRejectReasons(): string[] {
    return this.candidatesService.getAllRejectReasons();
  }

  @ApiOkResponse({ description: 'Object indicating columns and their visibility' })
  @ApiBadRequestResponse({ description: 'Failed to fetch candidate columns' })
  @Get('columns')
  getColumns(): CandidateColumns {
    return this.candidatesService.getCandidateColumns();
  }

  @ApiOkResponse({ description: 'Successfully created candidate' })
  @ApiBadRequestResponse({ description: 'Failed to create candidate' })
  @Post()
  create(@Body() candidate: Candidate): void {
    this.candidatesService.create(candidate);
  }

  @ApiOkResponse({ description: 'Array of candidates' })
  @Get()
  findAll(): Candidate[] {
    return this.candidatesService.findAll();
  }

  @ApiOkResponse({ description: 'Candidate details' })
  @ApiBadRequestResponse({ description: 'Failed to fetch candidate' })
  @Get(':id')
  findOne(@Param('id') id: string): Candidate | undefined {
    return this.candidatesService.findOne(id);
  }

  @ApiOkResponse({ description: 'Candidate details' })
  @ApiBadRequestResponse({ description: 'Failed to update candidate' })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Candidate>): Candidate | undefined {
    return this.candidatesService.update(id, data);
  }

  @ApiOkResponse({ description: 'Successfully removed candidate' })
  @ApiBadRequestResponse({ description: 'Failed to remove candidate' })
  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.candidatesService.remove(id);
  }

  @ApiOkResponse({ description: 'Successfully approved candidate' })
  @ApiBadRequestResponse({ description: 'Failed to approve candidate' })
  @Post('approve/:id')
  approveCandidate(@Param('id') id: string): void {
    this.candidatesService.approveCandidate(id);
  }

  @ApiOkResponse({ description: 'Successfully rejected candidate' })
  @ApiBadRequestResponse({ description: 'Failed to reject candidate' })
  @Post('reject/:id')
  rejectCandidate(@Param('id') id: string, @Body() body: { reasons: string[] }): void {
    this.candidatesService.rejectCandidate(id, body);
  }
}
