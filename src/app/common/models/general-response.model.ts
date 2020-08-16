import {ResponseHeader} from './response-header.model';

export class GeneralResponse<B, M>{
  header: ResponseHeader;
  body: B;
  meta: M;
  logger: any;
}
