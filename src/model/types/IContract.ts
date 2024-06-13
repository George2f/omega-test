import ITEM_STATUS_ENUM from './ItemStatusEnum';

export default interface IContract {
    id: number;
    kupac: string;
    broj_ugovora: string;
    datum_akontacije: string;
    rok_isporuke: string;
    status: ITEM_STATUS_ENUM;
}
