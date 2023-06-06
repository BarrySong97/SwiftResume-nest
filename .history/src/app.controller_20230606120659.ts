import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import puppeteer from 'puppeteer';
import { Pdf } from './common/models/pdf.model';
import { Response } from 'express';

async function convertHTMLtoPDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ path: outputPath, format: 'A4' });

  await browser.close();
  return pdfBuffer;
}

// 调用函数进行转换
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('pdf')
  async getPdf(@Body() pdf: Pdf, @Res() res: Response) {
    const pdfBuffer = await convertHTMLtoPDF(pdf.template, 'test.pdf');
    // 设置响应的内容类型为 PDF
    res.contentType('application/pdf');

    // 将 PDF 内容发送给前端
    res.send(pdfBuffer);
  }

  @Get('hello/:name')
  getHelloName(@Param('name') name: string): string {
    return this.appService.getHelloName(name);
  }
}
