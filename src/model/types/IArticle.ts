import ITEM_STATUS_ENUM from './ItemStatusEnum';

export default interface IArticle {
    id: number;
    naziv: string;
    dobavljač: string;
    status: ITEM_STATUS_ENUM;
}
