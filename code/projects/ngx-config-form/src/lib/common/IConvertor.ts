export interface IConvertor {
  in(v: any, args?: any): any;
  out(v: any, args?: any): any;
}
