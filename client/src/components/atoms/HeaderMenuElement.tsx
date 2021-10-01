import { Button, Menu, MenuItem } from '@material-ui/core'
import { ArrowDropDown, ArrowRightRounded } from '@material-ui/icons'
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { IHeaderMenuElementProps } from '../organisms/HomeHeader';

export const HeaderMenuElement = (props: IHeaderMenuElementProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { width } = useWindowDimensions()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleRequestClose = (event: any) => {        
        setIsOpen(false);
    };


    const options = props.options.map((o,i) => {
        return (
            <MenuItem onClick={handleRequestClose} key={`${i}`}>
                <MenuItemLabel>
                    <ArrowRightRounded />
                        {o}                        
                    </MenuItemLabel>
            </MenuItem>
        )
    })

    const reachedHorizontalLimit = width <= 640;
    
    const onHoverBtn = reachedHorizontalLimit ? undefined : handleClick;

    return (
        <div>            
            <Button
                aria-haspopup="true"
                onMouseOver={onHoverBtn}
                onClick={handleClick}
            >
                <MenuTitle id='perro'>
                    {props.title}
                    <ArrowDropDown />
                </MenuTitle>
            </Button>
            <Menu
                open={isOpen}
                onClose={handleRequestClose}
                anchorEl={anchorEl}
                onMouseLeave={handleRequestClose}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {options}
            </Menu>
        </div>
    )
}

const MenuTitle = styled.span`
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;    
`;

const MenuItemLabel = styled.span`
    color: white;
    display: flex;
    align-items: center;
`;
