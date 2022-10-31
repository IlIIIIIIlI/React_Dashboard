import React, { useEffect } from "react";
import styled from "styled-components";
// import Earnings from "./Earnings";
// import Profile from "./Profile";
import scrollreveal from "scrollreveal";
import YearStruct from './YearStruct';
import Records from './Records';
import TotalPrice from './TotalPrice';
import UnitPrice from './UnitPrice';
import HouseArea from './HouseArea';
import PplAttention from './PplAttention';
import PostTime from './PostTime';
import Interesting from './Interesting';
import NotInteresting from './NotInteresting';

export default function Justhouse() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 10,
      }
    );
  }, []);
  return (
    <Section>
      <div className="grid">
        <div className="row__zero">
          <h1>站上数据</h1>
          <p> 此图记录了站上总计二手房数据 （2022年10月3日更新）</p>
          <Records />
        </div>
        <div className="row__one">
          <YearStruct />
          <UnitPrice />
          <TotalPrice />
          <HouseArea />
          <PplAttention />
          <PostTime />
        </div>
        <div className="row__two">
          {/* <Earnings />
          <Profile /> */}
          <Interesting />
          <NotInteresting />
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    // margin-top: 10rem;
    .row__zero {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      height: 50%;
    }
    .row__one {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 50%;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
    }
  }
  // @media screen and (min-width: 280px) and (max-width: 1080px) {
  //   margin-left: 0;
  //   .grid {
  //     .row__one,
  //     .row__two {
  //       grid-template-columns: 1fr;
  //     }
  //   }
  // }
`;
