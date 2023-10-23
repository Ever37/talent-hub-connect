import { Injectable, NotFoundException } from '@nestjs/common';
import { candidates, columns } from 'src/data/testData';
import { CandidateColumns } from 'src/model/candidate-columns.type';
import { Candidate } from 'src/model/candidate.type';
import { extractReasons } from 'src/util/tools';

@Injectable()
export class CandidatesService {
  private readonly candidates: Candidate[] = [...candidates];

  create(candidate: Candidate): void {
    this.candidates.push(candidate);
  }

  findAll(): Candidate[] {
    return this.candidates;
  }

  findOne(id: string): Candidate {
    const candidate = this.candidates.find((c) => c.id === id);
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
    return candidate;
  }

  update(id: string, data: Partial<Candidate>): Candidate | undefined {
    const candidate = this.findOne(id);
    if (candidate) {
      const updatedCandidate: Candidate = {
        ...candidate,
        ...data,
      };
      // Reemplaza por el candidato actualizado
      const index = this.candidates.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.candidates[index] = updatedCandidate;
      }
      return updatedCandidate;
    }
    return undefined;
  }

  remove(id: string): void {
    const index = this.candidates.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.candidates.splice(index, 1);
    }
  }

  getAllRejectReasons(): string[] {
    return extractReasons(this.candidates);
  }

  getCandidateColumns(): CandidateColumns {
    return columns;
  }

  approveCandidate(id: string): void {
    const candidate = this.findOne(id);
    if (candidate) {
      candidate.reason = '';
      console.log(`Rejection reasons removed for candidate with ID ${id}.`);
    } else {
      console.log(`Candidate with ID ${id} not found.`);
    }
  }

  rejectCandidate(id: string, body: { reasons: string[] }): void {
    const candidate = this.findOne(id);
    if (candidate) {
      candidate.reason = body.reasons.join(',') ?? '';
      console.log(
        `Candidate with ID ${id} rejected with reasons: ${candidate.reason}`,
      );
    } else {
      console.log(`Candidate with ID ${id} not found.`);
    }
  }
}
