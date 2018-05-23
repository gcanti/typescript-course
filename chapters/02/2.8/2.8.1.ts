export type Flag = 'option1' | 'option2' | 'option3'

type Options = { [K in Flag]: boolean }
/* same as
type Options = {
    option1: boolean;
    option2: boolean;
    option3: boolean;
}
*/
