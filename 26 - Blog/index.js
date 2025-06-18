import express from 'express';
import session from 'express-session';

// In a real application, you would store blog posts in a database.
// For this sample, you can keep them in memory as an array:
var blogPosts = [
    {
        id: 0,
        title: "The Shape of the Essay Field",
        date: "2023-10-01",        
        content: `An essay has to tell people something they don't already know. But there are three different reasons people might not know something, and they yield three very different kinds of essays.

One reason people won't know something is if it's not important to know. That doesn't mean it will make a bad essay. For example, you might write a good essay about a particular model of car. Readers would learn something from it. It would add to their picture of the world. For a handful of readers it might even spur some kind of epiphany. But unless this is a very unusual car it's not critical for everyone to know about it. [1]

If something isn't important to know, there's no answer to the question of why people don't know it. Not knowing random facts is the default. But if you're going to write about things that are important to know, you have to ask why your readers don't already know them. Is it because they're smart but inexperienced, or because they're obtuse?

So the three reasons readers might not already know what you tell them are (a) that it's not important, (b) that they're obtuse, or (c) that they're inexperienced.

The reason I did this breakdown was to get at the following fact, which might have seemed controversial if I'd led with it, but should be obvious now. If you're writing for smart people about important things, you're writing for the young.

Or more precisely, that's where you'll have the most effect. Whatever you say should also be at least somewhat novel to you, however old you are. It's not an essay otherwise, because an essay is something you write to figure something out. But whatever you figure out will presumably be more of a surprise to younger readers than it is to you.

There's a continuum of surprise. At one extreme, something you read can change your whole way of thinking. The Selfish Gene did this to me. It was like suddenly seeing the other interpretation of an ambiguous image: you can treat genes rather than organisms as the protagonists, and evolution becomes easier to understand when you do. At the other extreme, writing merely puts into words something readers were already thinking — or thought they were.

The impact of an essay is how much it changes readers' thinking multiplied by the importance of the topic. But it's hard to do well at both. It's hard to have big new ideas about important topics. So in practice there's a tradeoff: you can change readers' thinking a lot about moderately important things, or change it a little about very important ones. But with younger readers the tradeoff shifts. There's more room to change their thinking, so there's a bigger payoff for writing about important things.

The tradeoff isn't a conscious one, at least not for me. It's more like a kind of gravitational field that writers work in. But every essayist works in it, whether they realize it or not.

This seems obvious once you state it, but it took me a long time to understand. I knew I wanted to write for smart people about important topics. I noticed empirically that I seemed to be writing for the young. But it took me years to understand that the latter was an automatic consequence of the former. In fact I only really figured it out as I was writing this essay.

Now that I know it, should I change anything? I don't think so. In fact seeing the shape of the field that writers work in has reminded me that I'm not optimizing for returns in it. I'm not trying to surprise readers of any particular age; I'm trying to surprise myself.

The way I usually decide what to write about is by following curiosity. I notice something new and dig into it. It would probably be a mistake to change that. But seeing the shape of the essay field has set me thinking. What would surprise young readers? Which important things do people tend to learn late? Interesting question. I should think about that.
`
    },
    {
        id: 1,
        title: "Good Writing",
        date: "2023-10-02",
        content: `There are two senses in which writing can be good: it can sound good, and the ideas can be right. It can have nice, flowing sentences, and it can draw correct conclusions about important things. It might seem as if these two kinds of good would be unrelated, like the speed of a car and the color it's painted. And yet I don't think they are. I think writing that sounds good is more likely to be right.

So here we have the most exciting kind of idea: one that seems both preposterous and true. Let's examine it. How can this possibly be true?

I know it's true from writing. You can't simultaneously optimize two unrelated things; when you push one far enough, you always end up sacrificing the other. And yet no matter how hard I push, I never find myself having to choose between the sentence that sounds best and the one that expresses an idea best. If I did, it would be frivolous to care how sentences sound. But in practice it feels the opposite of frivolous. Fixing sentences that sound bad seems to help get the ideas right. [1]

By right I mean more than just true. Getting the ideas right means developing them well — drawing the conclusions that matter most, and exploring each one to the right level of detail. So getting the ideas right is not just a matter of saying true things, but saying the right true things.

How could trying to make sentences sound good help you do that? The clue to the answer is something I noticed 30 years ago when I was doing the layout for my first book. Sometimes when you're laying out text you have bad luck. For example, you get a section that runs one line longer than the page. I don't know what ordinary typesetters do in this situation, but what I did was rewrite the section to make it a line shorter. You'd expect such an arbitrary constraint to make the writing worse. But I found, to my surprise, that it never did. I always ended up with something I liked better.

I don't think this was because my writing was especially careless. I think if you pointed to a random paragraph in anything written by anyone and told them to make it slightly shorter (or longer), they'd probably be able to come up with something better.

The best analogy for this phenomenon is when you shake a bin full of different objects. The shakes are arbitrary motions. Or more precisely, they're not calculated to make any two specific objects fit more closely together. And yet repeated shaking inevitably makes the objects discover brilliantly clever ways of packing themselves. Gravity won't let them become less tightly packed, so any change has to be a change for the better. [2]

So it is with writing. If you have to rewrite an awkward passage, you'll never do it in a way that makes it less true. You couldn't bear it, any more than gravity could bear things floating upward. So any change in the ideas has to be a change for the better.

It's obvious once you think about it. Writing that sounds good is more likely to be right for the same reason that a well-shaken bin is more likely to be tightly packed. But there's something else going on as well. Sounding good isn't just a random external force that leaves the ideas in an essay better off. It actually helps you to get them right.

The reason is that it makes the essay easier to read. It's less work to read writing that flows well. How does that help the writer? Because the writer is the first reader. When I'm working on an essay, I spend far more time reading than writing. I'll reread some parts 50 or 100 times, replaying the thoughts in them and asking myself, like someone sanding a piece of wood, does anything catch? Does anything feel wrong? And the easier the essay is to read, the easier it is to notice if something catches.

So yes, the two senses of good writing are connected in at least two ways. Trying to make writing sound good makes you fix mistakes unconsciously, and also helps you fix them consciously; it shakes the bin of ideas, and also makes mistakes easier to see. But now that we've dissolved one layer of preposterousness, I can't resist adding another. Does sounding good do more than just help you get the ideas right? Is writing that sounds good inherently more likely to be right? Crazy as it may seem, I think that's true too.

Obviously there's a connection at the level of individual words. There are lots of words in English that sound like what they mean, often in wonderfully subtle ways. Glitter. Round. Scrape. Prim. Cavalcade. But the sound of good writing depends even more on the way you put words together, and there's a connection at that level too.

When writing sounds good, it's mostly because it has good rhythm. But the rhythm of good writing is not the rhythm of music, or the meter of verse. It's not so regular. If it were, it wouldn't be good, because the rhythm of good writing has to match the ideas in it, and ideas have all kinds of different shapes. Sometimes they're simple and you just state them. But other times they're more subtle, and you need longer, more complicated sentences to tease out all the implications.

An essay is a cleaned up train of thought, in the same way dialogue is cleaned up conversation, and a train of thought has a natural rhythm. So when an essay sounds good, it's not merely because it has a pleasing rhythm, but because it has its natural one. Which means you can use getting the rhythm right as a heuristic for getting the ideas right. And not just in principle: good writers do both simultaneously as a matter of course. Often I don't even distinguish between the two problems. I just think Ugh, this doesn't sound right; what do I mean to say here? [3]

The sound of writing turns out to be more like the shape of a plane than the color of a car. If it looks good, as Kelly Johnson used to say, it will fly well.

This is only true of writing that's used to develop ideas, though. It doesn't apply when you have ideas in some other way and then write about them afterward — for example, if you build something, or conduct an experiment, and then write a paper about it. In such cases the ideas often live more in the work than the writing, so the writing can be bad even though the ideas are good. The writing in textbooks and popular surveys can be bad for the same reason: the author isn't developing the ideas, merely describing other people's. It's only when you're writing to develop ideas that there's such a close connection between the two senses of doing it well.

Ok, many people will be thinking, this seems plausible so far, but what about liars? Is it not notoriously possible for a smooth-tongued liar to write something beautiful that's completely false?

It is, of course. But not without method acting. The way to write something beautiful and false is to begin by making yourself almost believe it. So just like someone writing something beautiful and true, you're presenting a perfectly-formed train of thought. The difference is the point where it attaches to the world. You're saying something that would be true if certain false premises were. If for some bizarre reason the number of jobs in a country were fixed, then immigrants really would be taking our jobs.

So it's not quite right to say that better sounding writing is more likely to be true. Better sounding writing is more likely to be internally consistent. If the writer is honest, internal consistency and truth converge.

But while we can't safely conclude that beautiful writing is true, it's usually safe to conclude the converse: something that seems clumsily written will usually have gotten the ideas wrong too.

Indeed, the two senses of good writing are more like two ends of the same thing. The connection between them is not a rigid one; the goodness of good writing is not a rod but a rope, with multiple overlapping connections running through it. But it's hard to move one end without moving the other. It's hard to be right without sounding right.`
    },
    {
        id: 2,
        title: `What To Do`,
        date: "2023-10-03",
        content: `What should one do? That may seem a strange question, but it's not meaningless or unanswerable. It's the sort of question kids ask before they learn not to ask big questions. I only came across it myself in the process of investigating something else. But once I did, I thought I should at least try to answer it.

So what should one do? One should help people, and take care of the world. Those two are obvious. But is there anything else? When I ask that, the answer that pops up is Make good new things.

I can't prove that one should do this, any more than I can prove that one should help people or take care of the world. We're talking about first principles here. But I can explain why this principle makes sense. The most impressive thing humans can do is to think. It may be the most impressive thing that can be done. And the best kind of thinking, or more precisely the best proof that one has thought well, is to make good new things.

I mean new things in a very general sense. Newton's physics was a good new thing. Indeed, the first version of this principle was to have good new ideas. But that didn't seem general enough: it didn't include making art or music, for example, except insofar as they embody new ideas. And while they may embody new ideas, that's not all they embody, unless you stretch the word "idea" so uselessly thin that it includes everything that goes through your nervous system.

Even for ideas that one has consciously, though, I prefer the phrasing "make good new things." There are other ways to describe the best kind of thinking. To make discoveries, for example, or to understand something more deeply than others have. But how well do you understand something if you can't make a model of it, or write about it? Indeed, trying to express what you understand is not just a way to prove that you understand it, but a way to understand it better.

Another reason I like this phrasing is that it biases us toward creation. It causes us to prefer the kind of ideas that are naturally seen as making things rather than, say, making critical observations about things other people have made. Those are ideas too, and sometimes valuable ones, but it's easy to trick oneself into believing they're more valuable than they are. Criticism seems sophisticated, and making new things often seems awkward, especially at first; and yet it's precisely those first steps that are most rare and valuable.

Is newness essential? I think so. Obviously it's essential in science. If you copied a paper of someone else's and published it as your own, it would seem not merely unimpressive but dishonest. And it's similar in the arts. A copy of a good painting can be a pleasing thing, but it's not impressive in the way the original was. Which in turn implies it's not impressive to make the same thing over and over, however well; you're just copying yourself.

Note though that we're talking about a different kind of should with this principle. Taking care of people and the world are shoulds in the sense that they're one's duty, but making good new things is a should in the sense that this is how to live to one's full potential. Historically most rules about how to live have been a mix of both kinds of should, though usually with more of the former than the latter. [1]

For most of history the question "What should one do?" got much the same answer everywhere, whether you asked Cicero or Confucius. You should be wise, brave, honest, temperate, and just, uphold tradition, and serve the public interest. There was a long stretch where in some parts of the world the answer became "Serve God," but in practice it was still considered good to be wise, brave, honest, temperate, and just, uphold tradition, and serve the public interest. And indeed this recipe would have seemed right to most Victorians. But there's nothing in it about taking care of the world or making new things, and that's a bit worrying, because it seems like this question should be a timeless one. The answer shouldn't change much.

I'm not too worried that the traditional answers don't mention taking care of the world. Obviously people only started to care about that once it became clear we could ruin it. But how can making good new things be important if the traditional answers don't mention it?

The traditional answers were answers to a slightly different question. They were answers to the question of how to be, rather than what to do. The audience didn't have a lot of choice about what to do. The audience up till recent centuries was the landowning class, which was also the political class. They weren't choosing between doing physics and writing novels. Their work was foreordained: manage their estates, participate in politics, fight when necessary. It was ok to do certain other kinds of work in one's spare time, but ideally one didn't have any. Cicero's De Officiis is one of the great classical answers to the question of how to live, and in it he explicitly says that he wouldn't even be writing it if he hadn't been excluded from public life by recent political upheavals. [2]

There were of course people doing what we would now call "original work," and they were often admired for it, but they weren't seen as models. Archimedes knew that he was the first to prove that a sphere has 2/3 the volume of the smallest enclosing cylinder and was very pleased about it. But you don't find ancient writers urging their readers to emulate him. They regarded him more as a prodigy than a model.

Now many more of us can follow Archimedes's example and devote most of our attention to one kind of work. He turned out to be a model after all, along with a collection of other people that his contemporaries would have found it strange to treat as a distinct group, because the vein of people making new things ran at right angles to the social hierarchy.

What kinds of new things count? I'd rather leave that question to the makers of them. It would be a risky business to try to define any kind of threshold, because new kinds of work are often despised at first. Raymond Chandler was writing literal pulp fiction, and he's now recognized as one of the best writers of the twentieth century. Indeed this pattern is so common that you can use it as a recipe: if you're excited about some kind of work that's not considered prestigious and you can explain what everyone else is overlooking about it, then this is not merely a kind of work that's ok to do, but one to seek out.

The other reason I wouldn't want to define any thresholds is that we don't need them. The kind of people who make good new things don't need rules to keep them honest.

So there's my guess at a set of principles to live by: take care of people and the world, and make good new things. Different people will do these to varying degrees. There will presumably be lots who focus entirely on taking care of people. There will be a few who focus mostly on making new things. But even if you're one of those, you should at least make sure that the new things you make don't net harm people or the world. And if you go a step further and try to make things that help them, you may find you're ahead on the trade. You'll be more constrained in what you can make, but you'll make it with more energy.

On the other hand, if you make something amazing, you'll often be helping people or the world even if you didn't mean to. Newton was driven by curiosity and ambition, not by any practical effect his work might have, and yet the practical effect of his work has been enormous. And this seems the rule rather than the exception. So if you think you can make something amazing, you should probably just go ahead and do it.
`
    }
];

var users = [
    {
        name: "Blog User",
        email: "blog@email.com",
        password: "password123",
    }
];

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Make user available in all templates
    next();
});

app.get("/", (req, res) => {
    console.log("Rendering index page with blog posts");
    res.render('index.ejs', {        
        blogPosts: blogPosts,        
    });
});

app.get("/post/:id", (req, res) => {
    console.log("Rendering post page for post ID:", req.params.id);  
    const postID = parseInt(req.params.id, 10); // Ensure postID is an integer
    const post = blogPosts.find(p => p.id === postID);
    if (post) {  
        console.log("Found post:", post);
        res.render('post.ejs', {
            post: post,            
        });
    } else {
        res.status(404).send("Post not found");
    }
});

app.get("/about", (req, res) => {
    console.log("Rendering about page");
    res.render('about.ejs');
});
Whereas
app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    res.send(`Registration successful! Email: ${email}, Password: ${password}`);
});

app.get("/login", (req, res) => {
    res.render('login.ejs');
    // const email = req.body.email;
    // const password = req.body.password;
    // // Here you would typically check the credentials against a database
    // if (email === "blog@email.com" && password === "password123") {
    //     res.send("Login successful!");
    // } else {
    //     res.send("Invalid email or password.");
    // }
});

app.post("/login", (req, res) => {
    console.log("Login attempt with body:", req.body);
    const email = req.body.email;
    const password = req.body.password;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        console.log("Login successful for:", user);
        req.session.user = user; // Store user in session
        res.render('index.ejs', {
            blogPosts: blogPosts,    
            user: user,        
        });
    } else {
        console.log("Login failed for email:", email);
        res.render('login.ejs', {
            error: "Invalid email or password.",
        });
    }
}); 

app.get("/signup", (req, res) => {
    res.render('signup.ejs');
});

app.post("/signup", (req, res) => {
    console.log("Signup attempt with body:", req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Here you would typically save the user to a database
    if (users.some(user => user.email === email)) {
        res.render('signup.ejs', {
            error: "Email already exists. Please use a different email.",
        });
    } else {
        console.log("New user details:", { name, email, password });
        users.push({ name, email, password });
        
        res.render('index.ejs', {
        blogPosts: blogPosts,        
        });
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect('/'); // Redirect to home page after logout
    });
});

app.get("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const postIndex = blogPosts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        blogPosts.splice(postIndex, 1); // Remove the post from the array
        res.redirect('/');
    } else {
        res.status(404).send("Post not found");
    }
});

app.get("/compose", (req, res) => {
    console.log("Rendering compose page");
    res.render('compose.ejs');
});

app.post("/compose", (req, res) => {
    console.log("Compose post attempt with body:", req.body);
    const title = req.body.title;    
    const content = req.body.content;
    
    // Create a new post object
    const newPost = {
        id: blogPosts.length, // Simple ID generation based on current length
        title: title,
        date: new Date().toLocaleDateString(),
        content: content
    };
    
    blogPosts.push(newPost); // Add the new post to the array
    console.log("New post created:", newPost);
    
    res.redirect('/'); // Redirect to the home page after creating the post
});  

app.get("/edit/:id", (req, res) => {
    console.log("Rendering edit page");
    res.render('edit.ejs', {
        post: blogPosts.find(post => post.id === parseInt(req.params.id, 10)) || null,
    });
});

app.post("/edit/:id", (req, res) => {
    console.log("Edit post attempt with body:", req.body);
    const postId = parseInt(req.params.id, 10);
    const postIndex = blogPosts.findIndex(post => post.id === postId);
    
    if (postIndex !== -1) {
        // Update the post
        blogPosts[postIndex].title = req.body.title;
        blogPosts[postIndex].content = req.body.content;
        console.log("Post updated:", blogPosts[postIndex]);
        res.redirect('/'); // Redirect to the home page after editing
    } else {
        res.status(404).send("Post not found");
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

