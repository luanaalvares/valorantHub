import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCharacterDto {
    @IsString()
    @IsNotEmpty()
    uuid: string;

    @IsString()
    @IsNotEmpty()
    displayName: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    developerName: string;

    @IsString()
    @IsNotEmpty()
    displayIcon: string;

    @IsString()
    @IsNotEmpty()
    portrait: string;

    @IsBoolean()
    @IsNotEmpty()
    isCustom: boolean;

    characterTags: string[];

    role: {
        name: string;
        description: string;
    };

    abilities: {
        slot: string;
        displayName: string;
        description: string;
        displayIcon: string;
    };
}
