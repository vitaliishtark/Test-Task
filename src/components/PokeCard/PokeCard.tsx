import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { addPokemon } from '../../store/pokemon.slice';
import { Link } from 'react-router-dom';
import styles from './PokeCard.module.scss'
type PokeCardProps = {
  data: any,
  className?: string;
  currentPage: number,
}

export const PokeCard: React.FC<PokeCardProps> = ({ currentPage, data, className }) => {
  const dispatch = useDispatch();
  const handleCardClick = () => {
    dispatch(addPokemon(data));
  };
  return (
    <>
      <Link className={className ? className : styles.cardLink} onClick={handleCardClick} to={data.name} state={{ currentPage: currentPage }}>
        <Card className={styles.card}>
          <CardMedia
            className={styles.img}
            component="img"
            alt={data?.name}
            height="300"
            loading='lazy'
            image={data?.sprites.other['official-artwork'].front_default}
          />
          <CardContent className={styles.cardContent}>
            <Typography className={styles.id} gutterBottom variant="h5" component="div">
              #{data?.id}
            </Typography>
            <Typography className={styles.name} variant="body2" color="text.secondary">
              {data?.name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}