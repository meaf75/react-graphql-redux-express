export interface AddElementActionType<t,d> {
    type: t,
    payload: {
        data: d;
    }
}