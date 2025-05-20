import styled from "styled-components";

export default function Summary(){
    return(
        <Wrapper>
        <Title>📄 Assignment Summary</Title>
        <TrendText>
          GM! Here’s my completed assignment for the Garden Finance frontend role 🚀
        </TrendText>
        <TrendText>
          It was originally due Monday, but I had some last-minute responsibilities at my previous role over the weekend. I got started yesterday and focused fully to get it done.
        </TrendText>
        <TrendText>
          For the assignment, I built a Bitcoin price chart and added functionality + pages that I felt aligned well with the vision. Looking forward to feedback and hoping this meets expectations 🌿
        </TrendText>
      </Wrapper>
      
      
    )
}

const Wrapper = styled.div`
  padding: 1rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const TrendText = styled.p`
  font-size: 1rem;
`;