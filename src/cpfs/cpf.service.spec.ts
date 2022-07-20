import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cpf } from './../cpfs/cpf.entity';
import { CpfService } from './cpf.service';
import TestUtil from './../../common/test/TestUtil';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as cpfValidator from 'node-cpf';

describe('CpfService', () => {
  let service: CpfService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn()
  };

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CpfService,
        {
          provide: getRepositoryToken(Cpf),
          useValue: mockRepository,
        },
      ],
      exports: [CpfService],
    }).compile();

    service = await app.get<CpfService>(CpfService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
    mockRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should be list all cpfs', async () => {
      const cpf = TestUtil.giveAMeAValidCpf();
      mockRepository.find.mockReturnValue([cpf, cpf]);
      const cpfs = await service.getAll();
      expect(cpfs).toHaveLength(2); 
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkCpf', () => {
    it('should find a existing cpf', async () => {
      const cpf = TestUtil.giveAMeAValidCpf();
      mockRepository.findOne.mockReturnValue(cpf);
      const cpfFound = await service.checkCpf(cpf.cpf);
      expect(cpfFound).toMatchObject({ cpf: cpf.cpf });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a cpf', async () => {
      mockRepository.findOne.mockReturnValue(null);

      await service.checkCpf(cpfValidator.generate()).catch(e => {
        expect(e).toBeInstanceOf(NotFoundException);
      });

      expect(mockRepository.findOne).toBeCalledTimes(1);
    })
  });

  describe('create cpf', () => {
    it('should create a cpf', async () => {
      const cpf = TestUtil.giveAMeAValidCpf();
      mockRepository.save.mockReturnValue(cpf);
      const savedCpf = await service.create(cpf);
      expect(savedCpf).toMatchObject(cpf);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
    it('should return exception when doesnt create a cpf', async () => {
      const cpf = TestUtil.giveAMeAValidCpf();
      mockRepository.save.mockReturnValue(null);
      await service.create(cpf).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'ExistsCpfException',
        });
      });
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });
  
  describe('delete', () => {
    it('should delete a cpf', async () => {
      const cpf = TestUtil.giveAMeAValidCpf();
      mockRepository.delete.mockReturnValue(cpf);
      mockRepository.findOne.mockReturnValue(cpf);
      const deleteCpf = await service.delete(cpfValidator.generate());
      expect(deleteCpf).toBeTruthy();
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    });
    it('should not delete a not existing cpf', async () => {
      const cpf = TestUtil.giveAMeAValidCpf();
      mockRepository.delete.mockReturnValue(null);
      mockRepository.findOne.mockReturnValue(cpf);
      const deleteCpf = await service.delete(cpfValidator.generate());
      expect(deleteCpf).toBeFalsy();
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    });
  });

  describe('cpfIsValid', () => {
    it('should cpf is valid', async () => {
      const cpf = TestUtil.giveAMeAValidCpf();
      const cpfIsValid = await service.cpfIsValid(cpf.cpf);
      expect(cpfIsValid).toBeTruthy();
    });
    it('should cpf is not valid', async () => {
      await service.cpfIsValid(null).catch(e => {
        expect(e).toBeInstanceOf(BadRequestException);
      });
    });
  });
});
