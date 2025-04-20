// print.ts
export enum PaperSize {
    A4 = 'A4',
    A3 = 'A3',
    A2 = 'A2',
    A1 = 'A1',
    A0 = 'A0',
    Letter = 'Letter',
    Legal = 'Legal',
    Tabloid = 'Tabloid'
  }
  
  export enum PaperOrientation {
    Portrait = 'portrait',
    Landscape = 'landscape'
  }
  
  type PaperDimensions = {
    width: number;
    height: number;
  };
  
  // 包含更多常见纸张尺寸(mm)
  const PAPER_DIMENSIONS_MM: Record<PaperSize, PaperDimensions> = {
    [PaperSize.A4]: { width: 210, height: 297 },
    [PaperSize.A3]: { width: 297, height: 420 },
    [PaperSize.A2]: { width: 420, height: 594 },
    [PaperSize.A1]: { width: 594, height: 841 },
    [PaperSize.A0]: { width: 841, height: 1189 },
    [PaperSize.Letter]: { width: 215.9, height: 279.4 },
    [PaperSize.Legal]: { width: 215.9, height: 355.6 },
    [PaperSize.Tabloid]: { width: 279.4, height: 431.8 }
  };
  
  export class PrintSizeCalculator {
    /**
     * 获取所有支持的纸张尺寸
     */
    static getAvailablePaperSizes(): PaperSize[] {
      return Object.values(PaperSize);
    }
  
    /**
     * 根据纸张尺寸和方向获取实际尺寸(mm)
     */
    static getPaperSize(
      size: PaperSize,
      orientation: PaperOrientation = PaperOrientation.Portrait
    ): PaperDimensions {
      const dimensions = PAPER_DIMENSIONS_MM[size];
      return orientation === PaperOrientation.Landscape
        ? { width: dimensions.height, height: dimensions.width }
        : dimensions;
    }
  
    /**
     * 将毫米尺寸转换为像素尺寸
     */
    static mmToPixels(dimensions: PaperDimensions, dpi: number): PaperDimensions {
      const mmPerInch = 25.4;
      return {
        width: Math.round((dimensions.width * dpi) / mmPerInch),
        height: Math.round((dimensions.height * dpi) / mmPerInch)
      };
    }
  
    /**
     * 获取指定纸张的像素尺寸
     */
    static getPixelSize(
      size: PaperSize,
      dpi: number,
      orientation: PaperOrientation = PaperOrientation.Portrait
    ): PaperDimensions {
      const paperSize = this.getPaperSize(size, orientation);
      return this.mmToPixels(paperSize, dpi);
    }
  
    /**
     * 获取推荐的DPI选项
     */
    static getRecommendedDpiOptions(): number[] {
      return [83, 96, 150, 200, 300, 600];
    }
  }