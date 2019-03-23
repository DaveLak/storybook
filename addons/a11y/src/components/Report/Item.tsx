import React, { Component, Fragment } from 'react';

import { styled } from '@storybook/theming';
import { Icons } from '@storybook/components';

import { Result } from 'axe-core';
import { Info } from './Info';
import { Elements } from './Elements';
import { Tags } from './Tags';
import { RuleType } from '../A11YPanel';
import HighlightToggle from './HighlightToggle';

const Wrapper = styled.div({
  width: '100%',
});

const HighlightToggleLabel = styled.label({
  cursor: 'pointer',
  userSelect: 'none',
});

const Icon = styled<any, any>(Icons)(({ theme }) => ({
  height: 10,
  width: 10,
  minWidth: 10,
  color: theme.color.mediumdark,
  marginRight: '10px',
  transition: 'transform 0.1s ease-in-out',
  alignSelf: 'center',
  display: 'inline-flex',
}));

const HeaderBar = styled.button(({ theme }) => ({
  padding: theme.layoutMargin,
  paddingLeft: theme.layoutMargin - 3,
  border: 0,
  background: 'none',
  color: 'inherit',
  textAlign: 'left',

  borderLeft: '3px solid transparent',

  '&:focus': {
    outline: '0 none',
    borderLeft: `3px solid ${theme.color.secondary}`,
  },
}));

const HighlightText = styled.span({
  fontWeight: 'normal',
});

interface ItemProps {
  item: Result;
  passes: boolean;
  type: RuleType;
}

interface ItemState {
  open: boolean;
}

export class Item extends Component<ItemProps, ItemState> {
  state = {
    open: false,
  };

  onToggle = () =>
    this.setState(prevState => ({
      open: !prevState.open,
    }));

  render() {
    const { item, passes, type } = this.props;
    const { open } = this.state;
    const toggleId: string = type
      .toString()
      .concat('-')
      .concat(item.id);

    return (
      <Fragment>
        <Wrapper>
          <HeaderBar onClick={this.onToggle}>
            <Icon
              icon="chevrondown"
              size={10}
              color="#9DA5AB"
              style={{
                transform: `rotate(${open ? 0 : -90}deg)`,
              }}
            />
            {item.description}
          </HeaderBar>
          <HighlightText>
            <HighlightToggle toggleID={toggleId} type={type} elementsToHighlight={item.nodes} />
            <HighlightToggleLabel htmlFor={toggleId}>Highlight</HighlightToggleLabel>
          </HighlightText>
        </Wrapper>
        {open ? (
          <Fragment>
            <Info item={item} key="info" />
            <Elements elements={item.nodes} passes={passes} type={type} key="elements" />
            <Tags tags={item.tags} key="tags" />
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}
