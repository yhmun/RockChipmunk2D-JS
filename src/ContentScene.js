/** ----------------------------------------------------------------------------------
 *
 *      File            ContentScene.js
 *      Ported By       Young-Hwan Mun
 *      Contact         yh.msw9@gmail.com
 * 
 * -----------------------------------------------------------------------------------
 *   
 *      Created By      ChildhoodAndy on 14-3-9    
 *
 * -----------------------------------------------------------------------------------
 * 
 *      Permission is hereby granted, free of charge, to any person obtaining a copy
 *      of this software and associated documentation files (the "Software"), to deal
 *      in the Software without restriction, including without limitation the rights
 *      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the Software is
 *      furnished to do so, subject to the following conditions:
 * 
 *      The above copyright notice and this permission notice shall be included in
 *      all copies or substantial portions of the Software.
 * 
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *      THE SOFTWARE.
 *
 * ----------------------------------------------------------------------------------- */ 

msw.Demos = 
[
	{ Name : "01 Basic"					, Scene:function ( ) { return new msw.Basic 				( ); } },	
	{ Name : "02 RollingBall"			, Scene:function ( ) { return new msw.RollingBall 			( ); } },	
	{ Name : "03 PinJoint"				, Scene:function ( ) { return new msw.PinJoint 				( ); } },	
	{ Name : "04 SlideJoint"			, Scene:function ( ) { return new msw.SlideJoint 			( ); } },	
	{ Name : "05 SpringJoint"			, Scene:function ( ) { return new msw.SpringJoint 			( ); } },	
	{ Name : "06 PivotJoint"			, Scene:function ( ) { return new msw.PivotJoint 			( ); } },	
	{ Name : "07 ContactFilter"			, Scene:function ( ) { return new msw.ContactFilter 		( ); } },	
	{ Name : "08 ColorMatch"			, Scene:function ( ) { return new msw.ColorMatch 			( ); } },	
	{ Name : "09 SimplePlatformer"		, Scene:function ( ) { return new msw.SimplePlatformer 		( ); } },	
	{ Name : "10 PointQuery"			, Scene:function ( ) { return new msw.PointQuery 			( ); } },	
	{ Name : "11 HitMe"					, Scene:function ( ) { return new msw.HitMe 				( ); } },	
	{ Name : "12 PRKitDemo"				, Scene:function ( ) { return new msw.PRKitDemo 			( ); } },	
	{ Name : "13 FruitCutNinja"			, Scene:function ( ) { return new msw.FruitCutNinja 		( ); } },	
	{ Name : "14 PhysicsLineDrawTest"	, Scene:function ( ) { return new msw.PhysicsLineDrawTest 	( ); } },	
];

msw.ContentScene = cc.Scene.extend 
({
	ctor:function ( ) 
	{
		this._super ( );
		
		var		BG = new cc.LayerColor ( cc.color ( 255, 255, 255, 255 ) );
		this.addChild ( BG );

		var 	TableView = new cc.TableView ( this, cc.size ( SCR_W, SCR_H - 60 ) );
		TableView.setDirection ( cc.SCROLLVIEW_DIRECTION_VERTICAL );
		TableView.setVerticalFillOrder ( cc.TABLEVIEW_FILL_TOPDOWN );
		TableView.setPosition ( 0, 30 );		
		TableView.setDelegate ( this );
		this.addChild ( TableView );
	},

	tableCellTouched:function ( Table, Cell ) 
	{
		cc.director.runScene ( msw.Demos [ Cell.getIdx ( ) ].Scene ( ) );
	},

	tableCellHighlight:function ( Table, Cell ) 
	{
		var		Sprite = Cell.getChildByTag ( 100 );
		Sprite.setTexture ( cc.textureCache.addImage ( "res/scrollItemBgSelected.png" ) );
	},

	tableCellUnhighlight:function ( Table, Cell ) 
	{
		var		Sprite = Cell.getChildByTag ( 100 );
		Sprite.setTexture ( cc.textureCache.addImage ( "res/scrollItemBgNormal.png" ) );
	},
	
	tableCellSizeForIndex:function ( Table, Idx )
	{
		return cc.size ( SCR_W, 60 );
	},

	tableCellAtIndex:function ( Table, Idx )
	{		
		var 	Cell = Table.dequeueCell ( );
		var		Name = msw.Demos [ Idx ].Name;
		
		if ( !Cell )
		{			
			Cell = new cc.TableViewCell ( );

			var 	Sprite = new cc.Sprite ( "res/scrollItemBgNormal.png" );			
			Sprite.setPosition ( SCR_W2, 30 );		
			Cell.addChild ( Sprite, 0, 100 );
		
			var		Label = new cc.LabelTTF ( Name, "Helvetica", 20 );
			Label.setAnchorPoint ( cc.p ( 0, 0.5 ) )
			Label.setPosition ( 40, 20 );		
			Label.setColor ( cc.color ( 0, 0, 0 ) );
			Sprite.addChild ( Label, 0, 123 );       		
		} 
		else 
		{
			var		Sprite = Cell  .getChildByTag ( 100 );
			var		Label  = Sprite.getChildByTag ( 123 );
			Label.setString ( Name );
		}

		return Cell;
	},
	
	numberOfCellsInTableView:function ( Table )
	{
		return msw.Demos.length;
	}
});
