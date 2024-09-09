import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseURL = 'https://localhost:5001/api/';
  products: Product[] = [];
  types: Type[] = [];
  brands: Brand[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, Pagination<Product[]>>();

  constructor(private http: HttpClient) { }

  getProducts(useCache = true) : Observable<Pagination<Product[]>> {

    if(!useCache) this.productCache = new Map();
    if(this,this.productCache.size > 0 && useCache)
    {
      if(this.productCache.has(Object.values(this.shopParams).join('-')))
      {
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if(this.shopParams.brandId > 0)
    {
      //params = params.append('brandId', brandId);
      params = params.set('brandId', this.shopParams.brandId); 
    }

    if(this.shopParams.typeId)
    {
      //params = params.append('typeId', typeId);
      params = params.set('typeId', this.shopParams.typeId);

    }

    params = params.set('sort', this.shopParams.sort);
    params = params.set('pageIndex', this.shopParams.pageNumber);
    params = params.set('pageSize', this.shopParams.pageSize);

    if(this.shopParams.search) params = params.set('search', this.shopParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseURL + 'products', {params: params}).pipe(
      map((response) => {
        this.productCache.set(Object.values(this.shopParams).join('-'), response)
        this.pagination = response;
        return response; // make sure we return the response for our apps
      })
    );
  }

  setShopParams(params: ShopParams)
  {
    this.shopParams = params;
  }

  getShopParams()
  {
    return this.shopParams;
  }

  getProduct(id: number) {
    const product = [...this.productCache.values()]
    .reduce((acc, paginationResult) => {
      return {...acc, ...paginationResult.data.find(x => x.id === id)}
    }, {} as Product);    

    if(Object.keys(product).length !== 0) return of(product); // of(product) make sure we return an observable as product
    return this.http.get<Product>(this.baseURL + 'products/' + id)
  }

  getBrands() {
    if(this.brands.length > 0) return of(this.brands);
    return this.http.get<Brand[]>(this.baseURL + 'products/brands').pipe(
      map(brands => this.brands = brands)
    );
  }

  getTypes() {
    if(this.types.length > 0) return of(this.types);
    return this.http.get<Type[]>(this.baseURL + 'products/types').pipe(
      map(types => this.types = types)
    );
  }
}
