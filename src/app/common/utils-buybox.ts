export class UtilsBuybox {

  private colors = [
    '#0B84A5',
    '#F6C85F',
    '#6F4E7C',
    '#9DD866',
    '#CA472F',
    '#FFA056',
    '#8DDDD0',
    '#f0b8b8',
    '#ec9c9d',
    '#e67f83',
    '#de6069',
    '#d43d51'];

  private iColor = 0;

  public nextColor(): string {
    return this.colors[this.iColor++ % this.colors.length];
  }

  public getIntRandom(max: number): number{
    return Math.floor(Math.random() * 16);
  }
}
