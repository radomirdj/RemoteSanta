import { Controller, Post, Body, UseGuards, Patch, Param, Get,Query } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ReportsService } from './reports.service';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService){}


    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    changeApproval(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportService.changeApproval(id , body.approved);
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportService.createEstimate(query);
    }

}
