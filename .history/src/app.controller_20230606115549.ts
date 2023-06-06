import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import puppeteer from 'puppeteer';
import { Pdf } from './common/models/pdf.model';

async function convertHTMLtoPDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath, format: 'A4' });

  await browser.close();
}

// 调用函数进行转换
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('pdf')
  getPdf(@Body() pdf: Pdf) {
    convertHTMLtoPDF(pdf.template, 'test.pdf');
  }

  @Get('hello/:name')
  getHelloName(@Param('name') name: string): string {
    return this.appService.getHelloName(name);
  }
}
