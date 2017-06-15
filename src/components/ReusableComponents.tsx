import * as Bootstrap from 'react-bootstrap';
import * as Radium from 'radium';
const ReactFontAwesome = require<any>('react-fontawesome');

export const Pagination = Radium(Bootstrap.Pagination);
export const Grid = Radium(Bootstrap.Grid);
export const Row = Radium(Bootstrap.Row);
export const Col = Radium(Bootstrap.Col);
export const FontAwesome = Radium(ReactFontAwesome);
export const Alert = Radium(Bootstrap.Alert);
export const Button = Radium(Bootstrap.Button);
export const FormControl = Radium(Bootstrap.FormControl);
export const Form = Radium(Bootstrap.Form);
export const Panel = Radium(Bootstrap.Panel);
export const FormGroup = Radium(Bootstrap.FormGroup);
export const Modal = Radium(Bootstrap.Modal);
export const ControlLabel = Radium(Bootstrap.ControlLabel);
export const ButtonGroup = Radium(Bootstrap.ButtonGroup);
export const Checkbox = Radium(Bootstrap.Checkbox);
export const Tabs = Radium(Bootstrap.Tabs);
export const Tab = Radium(Bootstrap.Tab);
export const Radio = Radium(Bootstrap.Radio);
/**
 * Using any here to avoid an error occured due different versions of type definitions
 * TODO: Remove any after porting react-hero to new boilerplate
 */
export const InputGroup: any = Radium(Bootstrap.InputGroup);
export const Label = Radium(Bootstrap.Label);
export const Well = Radium(Bootstrap.Well);
export const Table = Radium(Bootstrap.Table);
export const Tooltip = Radium(Bootstrap.Tooltip);
export const OverlayTrigger = Radium(Bootstrap.OverlayTrigger);
