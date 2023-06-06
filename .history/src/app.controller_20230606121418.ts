import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import puppeteer from 'puppeteer';
import { Pdf } from './common/models/pdf.model';
import { Response } from 'express';

async function convertHTMLtoPDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({
    format: 'A4',
    displayHeaderFooter: false,
    printBackground: true,
    margin: {
      top: '0.4in',
      bottom: '0.4in',
      left: '0.4in',
      right: '0.4in',
    },
  });

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
