import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import puppeteer from 'puppeteer';
import { PdfSetting } from './common/models/pdf-setting.model';
import { Response } from 'express';

async function convertHTMLtoPDF(pdfSetting: PdfSetting) {
  const { margin, template } = pdfSetting;
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const { left, top, right, bottom, unit } = margin;
  await page.setContent(template, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({
    format: 'A4',
    displayHeaderFooter: false,
    printBackground: true,
    margin: {
      top: `${top}${unit}`,
      bottom: `${bottom}${unit}`,
      left: `${left}${unit}`,
      right: `${right}${unit}`,
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
  async getPdf(@Body() pdfSetting: PdfSetting, @Res() res: Response) {
    const pdfBuffer = await convertHTMLtoPDF(pdfSetting);
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
