export class Pagination {
    constructor(
      public readonly data: any[],
      public readonly total: number,
      public readonly page: number,
      public readonly limit: number
    ) {}
  
    get totalPages(): number {
      return Math.ceil(this.total / this.limit);
    }
  
    get currentPage(): number {
      return this.page;
    }
  
    get totalProducts(): number {
      return this.total;
    }
  }