export interface IConverter {
  to(v: any, args?: any): any;
  from(v: any, args?: any): any;
}
