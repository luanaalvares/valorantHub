import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({timestamps: true, id: false, collection: 'characters'})
export class Character {
    @Prop()
    uuid: string;

    @Prop()
    displayName: string;

    @Prop()
    description: string;

    @Prop()
    developerName: string;

    @Prop()
    characterTags: string[];

    @Prop()
    displayIcon: string;

    @Prop()
    portrait: string;

    @Prop(raw({
        name: { type: String },
        description: { type: String },
    }))
    role: Record<string, any>;

    @Prop(raw({
        slot: { type: String },
        displayName: { type: String },
        description: { type: String },
        displayIcon: { type: String },
    }))
    abilities: Record<string, any>[];

    @Prop()
    isCustom: boolean;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);