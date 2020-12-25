import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../../store';
import { deleteSingleMovieData, getSingleMovieRequest } from '../../actions';
import defaultPicture from '../../../images/default-movie.jpg';
import { IMovieItem } from '../../types';

interface ParamTypes {
  id: string
}

export function DetailsModal() {
  const { singleMovieData } = useSelector((state: RootState) => state.movie);
  const { id } = useParams<ParamTypes>();
  const requestId: number = parseInt(id, 10);

  const history = useHistory();
  const dispatch = useDispatch();

  const backFunction = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    if (!singleMovieData) {
      dispatch(getSingleMovieRequest(requestId));
    }
  }, [dispatch, requestId, singleMovieData]);

  useEffect(() => () => {
    dispatch(deleteSingleMovieData());
  }, [dispatch]);

  return (
    singleMovieData
      ? (
        <>
          <Fogging onClick={backFunction}>
            <Content data={singleMovieData} onClick={((e) => e.stopPropagation())} />
          </Fogging>
        </>
      ) : null
  );
}

interface IPropsContent {
  data: IMovieItem
  onClick: (event: React.MouseEvent) => void
}

function Content({
  data: {
    poster_path: image, title, tagline, overview, vote_average: rating, vote_count: voters,
  },
  onClick,
}: IPropsContent) {
  const onErrorImg = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = defaultPicture;
  }, []);

  return (
    <>
      <ModalWindow onClick={onClick}>
        <ImageContainer>
          <StyledImg src={image} alt="" onError={onErrorImg} />
        </ImageContainer>
        <ContentContainer>
          <StyledTitle>{title}</StyledTitle>
          <StyledText>{tagline}</StyledText>
          <StyledText>{overview}</StyledText>
          <StyledText>{`Rating: ${rating}`}</StyledText>
          <StyledText>{`Voters: ${voters}`}</StyledText>
        </ContentContainer>
      </ModalWindow>
    </>
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
  left: calc(50% - 400px);
  display: flex;
  width: 800px;
  height: 600px;
  background: #FFFFFF;
  z-index: 10;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 15px 10px;
  font-family: 'Poppins', sans-serif;
`;

const StyledTitle = styled.h2`
  font-weight: 600;
  color: #01010D;
  text-transform: uppercase;
`;

const StyledText = styled.p`
  font-size: 14px;
  color: #01010D;
  text-transform: none;
`;
