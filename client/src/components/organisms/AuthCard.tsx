import { Button, Card, createStyles, Divider, makeStyles } from '@material-ui/core'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import React from 'react';
import { SimpleTransition } from '../molecules/SimpleTransition';

const useStyles = makeStyles(() =>
    createStyles({
        card_content: {
            padding: 15,
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'space-around'
        },
        title: {
            textAlign: 'center',
            color: '#636363'
        },
        footer: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            marginTop: 15
        },
        create_account_link: {
            color: '#00a8f3',
            cursor: 'pointer',
            fontWeight: 'bold'
        },
        margin_top_10: {
            marginTop: 10,
        },
        login_btn: {
            backgroundColor: '#3f81b5',
            marginTop: 10,
        }
    }),
);

export interface IAuthCardProps {
    /** Modal content */
    children: React.ReactNode;
    title: string;
    actionButtonTitle: string;
    footerLabel: string;
    footerLinkTitle: string;
    footerLinkRoute: string;
    isOpen: boolean;
    onPressActionBtn: () => void;
}

export const AuthCard = (props: IAuthCardProps) => {
    const styles = useStyles()

    return (
        <SimpleTransition isOpen={props.isOpen}>
            <MainContainer>
                <Card className={styles.card_content}>

                    {/* Header */}
                    <div>
                        <h1 className={styles.title}>{props.title}</h1>
                    </div>

                    {/* Form content */}
                    <div>
                        {props.children}
                    </div>

                    {/* After login */}
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        className={`${styles.login_btn} ${styles.margin_top_10}`}
                        onClick={props.onPressActionBtn}>
                            {props.actionButtonTitle}
                    </Button>

                    {/* Footer */}
                    <div className={styles.footer}>
                        <Divider />
                        <strong className={styles.title}>or</strong>
                        <span>
                            {props.footerLabel} <Link className={styles.create_account_link} to={props.footerLinkRoute}>{props.footerLinkTitle}</Link>
                        </span>
                    </div>
                </Card>
            </MainContainer>
        </SimpleTransition>
    )
}

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
`;
