import * as React from 'react';
import * as Radium from 'radium';
import {MapStateToProps, connect} from 'react-redux';
import {CSS} from '../../interfaces';
import {Modal, Button, Row, Col, FontAwesome} from '../ReusableComponents';
import {ButtonProps} from 'react-bootstrap';

export interface IConfirmationModalStateProps {
    show?: boolean;
    modalBody?: string;
    modalFooter?: string;
}

export interface IConfirmationModalProps extends IConfirmationModalStateProps {
    onConfirm: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
    onHide: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
}

export interface IConfirmationModalState {
    confirmationModal: boolean;
}

@Radium
export class ConfirmationModalImpl extends React.Component<IConfirmationModalProps> {

    render(): JSX.Element {
        return (
            <Modal dialogClassName="modalDialog" show={this.props.show} onHide={this.props.onHide}>
                <Modal.Body>
                    <Row style={rowStyle}>
                        <Col sm={2}>
                            <FontAwesome name="question-circle" size="3x" />
                        </Col>
                        <Col sm={10}>
                            <strong style={fontStyle}>
                                {this.props.modalBody}
                            </strong>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer style={footerStyle}>
                    <Button bsStyle="primary" onClick={this.props.onConfirm}>Confirm</Button>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


let mapStateToProps: MapStateToProps<IConfirmationModalStateProps, IConfirmationModalProps> =
        (state: IConfirmationModalState): IConfirmationModalStateProps => {
            return {
                show: state.confirmationModal,
            };
};

let ConfirmationModal: React.ComponentClass<IConfirmationModalProps> = connect(mapStateToProps)(ConfirmationModalImpl);

export {ConfirmationModal};

const fontStyle: CSS = {
    fontSize: '16px',
    lineHeight: '22.5px',
    wordBreak: 'break-all',
};
const rowStyle: CSS = {
    padding: '15px 5px',
};
const footerStyle: CSS = {
    padding: '20px',
};
