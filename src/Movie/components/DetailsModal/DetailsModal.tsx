import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import FadeLoader from 'react-spinners/FadeLoader';
import { enableBodyScroll } from 'body-scroll-lock';
import { useSwipeable } from 'react-swipeable';
import { RootState } from '../../../store';
import { deleteSingleMovieData, getSingleMovieRequest } from '../../actions';
import defaultPicture from '../../../images/default-movie.jpg';

interface ParamTypes {
  id: string
}

export function DetailsModal() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams<ParamTypes>();
  const requestId: number = parseInt(id, 10);

  const { singleMovieData, loadingModal } = useSelector((state: RootState) => state.movie);
  const {
    poster_path: image, title, tagline, overview, vote_average: rating, vote_count: voters,
    budget, revenue, runtime,
  } = singleMovieData || {};

  useEffect(() => {
    dispatch(getSingleMovieRequest(requestId));
  }, [dispatch, requestId]);

  const target = document.querySelector('.modal');

  const backFunction = useCallback(() => {
    history.replace('/');
    dispatch(deleteSingleMovieData());
    if (target) {
      enableBodyScroll(target);
    }
  }, [target, history, dispatch]);

  const onErrorImg = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = defaultPicture;
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => backFunction(),
  });

  return (
    <Fogging onClick={backFunction}>
      <ModalWindow {...swipeHandlers} onClick={(event) => event.stopPropagation()} className="modal">
        <ImageContainer>
          {loadingModal ? <FadeLoader /> : <StyledImg src={image} alt="" onError={onErrorImg} /> }
        </ImageContainer>
        <>
          {title ? (
            <ContentContainer>
              <StyledTitle next={tagline}>{title}</StyledTitle>
              <Tagline>{tagline}</Tagline>
              <StyledText style={{ overflowY: 'auto' }}>{overview}</StyledText>
              <StyledText>{runtime ? `Duration: ${runtime} min` : null}</StyledText>
              <StyledText>{budget && revenue ? `Budget: $${budget} / Revenue: $${revenue}` : null}</StyledText>
              <Details>
                <RatingSpan percent={rating ? (`${String(rating * 10)}%`) : '0%'}>{`Rating: ${rating}`}</RatingSpan>
                <VotersSpan>{`Voters: ${voters}`}</VotersSpan>
              </Details>
            </ContentContainer>
          )
            : null}
          {!title && !loadingModal ? <p>Not found</p> : null}
        </>
      </ModalWindow>
    </Fogging>
  );
}

const Fogging = styled.div`
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 5;
`;

const ModalWindow = styled.div`
  position: absolute;
  top: 10%;
  left: calc(50% - 450px);
  display: flex;
  width: 900px;
  height: 600px;
  background: #FFFFFF;
  z-index: 10;

  @media (max-width: 1024px) {
    left: calc(50% - 340px);
    width: 675px;
    height: 550px;
  }
  @media (max-width: 768px) {
    left: calc(50% - 40vw);
    width: 80vw;
    height: 75vw;
  }
  @media (max-width: 600px) {
    top: 5%;
    flex-direction: column;
    height: auto;
    overflow-y: scroll;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;

  @media (max-width: 600px) {
    width: 100%;
    height: 300px;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  width: 55%;
  height: 100%;
  padding: 25px 15px;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 600px) {
    width: 100%;
    padding: 10px;
  }
`;

const StyledTitle = styled.h2<{ next: string | undefined}>`
  ${(props) => (props.next ? 'margin-bottom: 12px;' : 'margin-bottom: 25px;')}
  font-weight: 600;
  font-size: calc(30px + 0.7vw);
  color: #01010D;
  line-height: 1;
  text-transform: none;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Tagline = styled.p`
  margin-bottom: 25px;
  font-weight: 300;
  font-size: calc(20px + 0.1vw);
  color: #01010D;
  line-height: 1;
  text-transform: none;
  @media (max-width: 600px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const StyledText = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  color: #01010D;
  text-transform: none;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 0 10px;
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0;
  }
  @media (max-width: 320px) {
    flex-direction: row;
  }
`;

const RatingSpan = styled.span<{percent: string}>`
  position: relative;
  font-weight: 600;
  font-size: 18px;

  &::before {
    content: "★★★★★";
    position: absolute;
    top: -9px;
    left: calc(100% + 5px);
    font-size: 40px;
    color: transparent;
    line-height: 1;
    ${(props) => `background: linear-gradient(90deg, #FFCC00 0 ${props.percent}, #ECECEC ${props.percent} 100%);`}
    background-clip: text;
    -webkit-background-clip: text;

    @media (max-width: 1024px) {
      left: 40%;
    }
    @media (max-width: 600px) {
      top: -5px;
      font-size: 35px;
    }
    @media (max-width: 320px) {
      display: none;
    }
  }
`;

const VotersSpan = styled.span`
  position: relative;
  font-weight: 600;
  font-size: 18px;

  &::before {
    content: "\u2764";
    position: absolute;
    top: -8px;
    right: calc(100% + 5px);
    font-size: 30px;
    color: red;

    @media (max-width: 1024px) {
      display: none;
    }
  }
`;
