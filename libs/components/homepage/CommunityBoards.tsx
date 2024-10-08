import React, { useState } from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Typography } from '@mui/material';
import CommunityCard from './CommunityCard';
import { BoardArticle } from '../../types/board-article/board-article';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { T } from '../../types/common';

const CommunityBoards = () => {
	const device = useDeviceDetect();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		sort: 'articleViews',
		direction: 'DESC',
	});
	const [newsArticles, setNewsArticles] = useState<BoardArticle[]>([]);
	const [freeArticles, setFreeArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getNewsArticlesLoading,
		data: getNewsArticlesData,
		error: getNewsArticlesError,
        refetch: getNewsArticlesRefetch,
	 } = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: "network-only",
		variables:{input: { ...searchCommunity, limit: 6, search: {articleCategory: BoardArticleCategory.NEWS}} },
		notifyOnNetworkStatusChange: true,
		onCompleted:( data: T) => {
			setNewsArticles(data?.getBoardArticles?.list);
		},
	 });
       
	 /** FREE **/

	 const {
		loading: getFreeArticlesLoading,
		data: getFreeArticlesData,
		error: getFreeArticlesError,
        refetch: getFreeArticlesRefetch,
	 } = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: "network-only",
		variables:{input: { ...searchCommunity, limit: 3, search: {articleCategory: BoardArticleCategory.FREE} }},
		notifyOnNetworkStatusChange: true,
		onCompleted:( data: T) => {
			setFreeArticles(data?.getBoardArticles?.list);
		},
	 });


	if (device === 'mobile') {
		return (
			<Stack className={'community-board'}>
			<Stack className={'container'}>
				<Stack>
				<div className="fz-3-section-heading">
				   <h2 className="fz-section-title">News Feed</h2>
				   <p className="fz-section-sub-title">
					 True Pound Cake is a recipe that dates
					 </p>
				  </div>
				</Stack>
				<Stack className="community-main">
					<Stack className={'community-left'}>
						<Stack className={'content-top'}>
							 
						
						</Stack>
						<Stack className={'card-wrap'}>
							{newsArticles.map((article, index) => {
								return <CommunityCard vertical={true} article={article} index={index} key={article?._id} />;
							})}
						</Stack>
					</Stack> 
				
				</Stack>
			</Stack>
		</Stack>
		)
	} else {
		return (
			<Stack className={'community-board'}>
				<Stack className={'container'}>
					<Stack>
					<div className="fz-3-section-heading">
                       <h2 className="fz-section-title">News Feed</h2>
                       <p className="fz-section-sub-title">
                         True Pound Cake is a recipe that dates
                         </p>
                      </div>
					</Stack>
					<Stack className="community-main">
						<Stack className={'community-left'}>
							<Stack className={'content-top'}>
							     
							
							</Stack>
							<Stack className={'card-wrap'}>
								{newsArticles.map((article, index) => {
									return <CommunityCard vertical={true} article={article} index={index} key={article?._id} />;
								})}
							</Stack>
						</Stack> 
				
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default CommunityBoards;
