import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from 'class-validator';

export class CreateReportDto { 
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(100)
    @Max(1000000)
    price: number;
}