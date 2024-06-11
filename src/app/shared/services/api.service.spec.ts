import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TagInterface } from '../types/tag.interface';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(apiService).toBeTruthy();
  });

  describe('getTags', () => {
    it('should return a list of tags', () => {
      let tags: TagInterface[] | undefined;
      apiService.getTags().subscribe((response) => {
        tags = response;
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush([{ id: '007', name: 'bond' }]);
      expect(tags).toEqual([{ id: '007', name: 'bond' }]);
    });
  });

  describe('createTag', () => {
    it('should create a tag', () => {
      let tag: TagInterface | undefined;
      apiService.createTag('bond').subscribe((response) => {
        tag = response;
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush({ id: '007', name: 'bond' });
      expect(tag).toEqual({ id: '007', name: 'bond' });
    });

    it('passes the correct body', () => {
      let tag: TagInterface | undefined;
      apiService.createTag('bond').subscribe((response) => {
        tag = response;
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush({ id: '007', name: 'bond' });
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ name: 'bond' });
    });

    it('throws an error if request fails', () => {
      let actualError: HttpErrorResponse | undefined;
      apiService.createTag('bond').subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: (err) => {
          actualError = err;
        },
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessible entity',
      });

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }

      expect(actualError.status).toEqual(422);
      expect(actualError.statusText).toEqual('Unprocessible entity');
    });
  });
});
