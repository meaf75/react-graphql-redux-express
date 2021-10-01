import React from "react";
import { Transition } from "react-transition-group";
import { TweenMax } from 'gsap';

export interface ISimpleTransitionPros {
    isOpen: boolean;
    children: React.ReactNode;
}

const startState : gsap.TweenVars = { autoAlpha: 0, y: -50 };

export const SimpleTransition = (props: ISimpleTransitionPros) => {
    return (
        <Transition
                unmountOnExit
                in={props.isOpen}
                timeout={1000}
                onEnter={(node: any) => TweenMax.set(node, startState)}
                addEndListener={(node, done) => {
                    TweenMax.to(node, 0.5, {
                        autoAlpha: props.isOpen ? 1 : 0,
                        y: props.isOpen ? 0 : 50,
                        onComplete: done
                    });
                }}
            >
            {props.children}
        </Transition>
    )
}