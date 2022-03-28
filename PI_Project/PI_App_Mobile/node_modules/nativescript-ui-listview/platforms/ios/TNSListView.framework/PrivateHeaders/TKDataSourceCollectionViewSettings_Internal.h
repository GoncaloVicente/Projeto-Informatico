//
//  TKDataSourceCollectionViewSettings_Internal.h
//  TelerikUI
//
//  Copyright (c) 2015 Telerik. All rights reserved.
//
#import "TKDataSourceCollectionViewSettings.h"

@class TKRLVDataSource;
@class TKDataSourceGroup;

@interface TKDataSourceCollectionViewSettings ()

- (UICollectionViewCell*)ds_cellForItem:(id)item atIndexPath:(NSIndexPath*)indexPath inCollectionView:(UICollectionView*)collectionView;

- (void)ds_initCell:(UICollectionViewCell*)cell withItem:(id)item atIndexPath:(NSIndexPath*)indexPath inGroup:(TKDataSourceGroup*)group
     fromDataSource:(TKRLVDataSource*)dataSource inCollectionView:(UICollectionView*)collectionView;

@end