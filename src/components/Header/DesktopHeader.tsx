import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Launch } from '@material-ui/icons';
import logoUrl from '../Header/assets/ww-Logo.svg';
import { DesktopNotification } from '../Header/notifications/DesktopNotification';
import { WalletSelector } from './WalletSelector';
import { IonContent, IonHeader, IonAvatar, IonButtons, IonPage, IonTitle, IonToolbar, IonCard, IonItem, IonLabel, IonIcon, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonText } from '@ionic/react'

import { govPathname } from '../Header/env/gov';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled, { createGlobalStyle, DefaultTheme } from 'styled-components';

export interface DesktopHeaderProps {
  className?: string;
}
export const screen = {
  mobile: { max: 530 },
  // mobile : @media (max-width: ${screen.mobile.max}px)
  tablet: { min: 531, max: 830 },
  // tablet : @media (min-width: ${screen.tablet.min}px) and (max-width: ${screen.tablet.max}px)
  pc: { min: 831, max: 1439 },
  // pc : @media (min-width: ${screen.pc.min}px)
  monitor: { min: 1440 },
  // monitor : @media (min-width: ${screen.pc.min}px) and (max-width: ${screen.pc.max}px)
  // huge monitor : @media (min-width: ${screen.monitor.min}px)
} as const;
const links = {
  earn: 'https://app.gitbook.com/@anchor-protocol/s/anchor-2/user-guide/earn',
  borrow: 'https://app.gitbook.com/@anchor-protocol/s/anchor-2/user-guide/borrow',
  bond: 'https://app.gitbook.com/@anchor-protocol/s/anchor-2/user-guide/bond',
  gov: 'https://app.gitbook.com/@anchor-protocol/s/anchor-2/user-guide/govern',
  forum: 'https://forum.anchorprotocol.com/',
};
export const useTooltipStyle = makeStyles<DefaultTheme>(() => ({
  tooltip: {
    position: 'relative',
    borderRadius: 0,
    color: '#4BDB4B',
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: 600,
    padding: 0,
    top: -3,
    boxShadow: '1px 1px 6px 0px rgba(0,0,0,0.2)',
  },
}));

function DesktopHeaderBase({ className }: DesktopHeaderProps) {
  const tooltipClasses = useTooltipStyle();

  return (
    <IonHeader className={className}>
      <Tooltip
        title="Open the Dashboard"
        placement="right"
        classes={tooltipClasses}
      >
        <a
          className="logo"
          href="https://anchorprotocol.com/dashboard"
          target="_blank"
          rel="noreferrer"
        >
          <IonAvatar>
        <img src={logoUrl} />
      </IonAvatar>
        </a>
      </Tooltip>

      {/* <nav className="menu">
        <NavMenu to="/earn" title="EARN" docsTo={links.earn} />
        <NavMenu to="/borrow" title="BORROW" docsTo={links.borrow} />
        <NavMenu to="/bond" title="BOND" docsTo={links.bond} />
        <NavMenu to={`/${govPathname}`} title="GOVERN" docsTo={links.gov} />
      </nav> */}

      <div />

      <DesktopNotification className="notification" />

      <section className="wallet">
        <WalletSelector />
      </section>

      <GlobalStyle />
      </IonHeader>
  );
}

function NavMenu({
  to,
  docsTo,
  title,
  className,
}: {
  className?: string;
  to: string;
  docsTo: string;
  title: string;
}) {
  const match = useRouteMatch(to);

  return (
    <div className={className} data-active={!!match}>
      <Link to={to}>{title}</Link>
      <a href={docsTo} target="_blank" rel="noreferrer">
        Docs
        <Launch />
      </a>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  @media (max-width: ${screen.tablet.max}px) {
    body {
      padding-bottom: 60px;
    }
  }
`;

const desktopLayoutBreak = 1180;
const mobileLayoutBreak = 950;

export const DesktopHeader = styled(DesktopHeaderBase)`
  // ---------------------------------------------
  // style
  // ---------------------------------------------
  background-color: #000000;

  a {
    text-decoration: none;
  }

  .menu {
    > div {
      padding: 2px 17px;

      display: flex;
      align-items: center;

      a {
        color: rgba(255, 255, 255, 0.4);
      }

      a:first-child {
        font-size: 18px;
        font-weight: 900;

        text-decoration: none;
      }

      a:last-child {
        display: none;

        font-size: 12px;
        font-weight: 500;

        text-decoration: none;

        position: relative;

        svg {
          margin-left: 0px;
          font-size: 1em;
          transform: translateY(2px);
        }
      }

      &[data-active='true'] {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: ${({ theme }) => theme.backgroundColor};

        opacity: 1;

        a {
          color: ${({ theme }) => theme.textColor};
        }

        a:last-child {
          display: inline-block;

          margin-left: 17px;

          &::before {
            content: '';
            display: block;

            position: absolute;


            width: 1px;
            height: 18px;

            left: -8px;
            top: -1px;
          }
        }
      }
    }
  }

  // ---------------------------------------------
  // layout
  // ---------------------------------------------
  display: flex;
  //justify-content: space-between;
  align-items: flex-end;

  height: 88px;

  .menu {
    word-break: keep-all;
    white-space: nowrap;

    display: flex;

    > div {
      a:first-child {
        font-size: 18px;
      }
    }
  }

  > div:empty {
    flex: 1;
  }

  .notification {
    margin-right: 5px;
  }

  .wallet {
    padding-bottom: 8px;
    text-align: right;
  }

  .logo {
    position: absolute;
    top: 18px;
    left: 100px;

    transition: transform 0.17s ease-in-out;
    transform-origin: center;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (min-width: ${desktopLayoutBreak}px) {
    padding: 0 100px;
  }

  @media (max-width: ${desktopLayoutBreak}px) {
    padding: 0 100px;
  }

  @media (max-width: ${mobileLayoutBreak}px) {
    justify-content: space-between;

    padding: 0 40px;

    .logo {
      left: 40px;
    }

    //.wallet {
    //  display: none;
    //}
  }
`;
