import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import FadeLoader from 'react-spinners/FadeLoader';
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

  const backFunction = useCallback(() => {
    history.goBack();
    dispatch(deleteSingleMovieData());
  }, [history, dispatch]);

  const onErrorImg = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = defaultPicture;
  }, []);

  return (
    <Fogging onClick={backFunction}>
      <ModalWindow>
        <ImageContainer>
          {loadingModal ? <FadeLoader /> : <StyledImg src={image} alt="" onError={onErrorImg} /> }
        </ImageContainer>
        <>
          {title ? (
            <ContentContainer>
              <StyledTitle next={tagline}>{title}</StyledTitle>
              <Tagline>{tagline}</Tagline>
              <StyledText>{overview}</StyledText>
              <StyledText>{`Duration: ${runtime} min`}</StyledText>
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
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100%;
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
  width: 500px;
  height: 100%;
  padding: 25px 15px;
  font-family: 'Poppins', sans-serif;
`;

const StyledTitle = styled.h2<{ next: string | undefined}>`
  ${(props) => (props.next ? 'margin-bottom: 12px;' : 'margin-bottom: 25px;')}
  font-weight: 600;
  font-size: 40px;
  color: #01010D;
  line-height: 1;
  text-transform: none;
`;

const Tagline = styled.p`
  margin-bottom: 25px;
  font-weight: 300;
  font-size: 22px;
  color: #01010D;
  line-height: 1;
  text-transform: none;
`;

const StyledText = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  color: #01010D;
  text-transform: none;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 0 10px;
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
  }
`;
