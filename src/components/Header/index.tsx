import Link from 'next/link';

import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

import styled from './styles.module.scss';

export function Header() {
  return (
    <header className={styled.headerContainer}>
      <div className={styled.headerContent}>
        <Link href="/">
          <img src="/images/logo.svg" alt="ig.news"/>
        </Link>

        <nav>
          <ActiveLink activeClassName={styled.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styled.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}